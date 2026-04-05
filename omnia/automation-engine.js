/**
 * AUTOMATION ENGINE — Creative Factory
 * Queue système non-stop : UGC videos, image batches, cloner jobs
 * Démarre automatiquement au boot du serveur OMNIA
 */

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const DATA_DIR = path.join(__dirname, 'data');
const LOG_FILE = path.join(DATA_DIR, 'automation_log.json');
const QUEUE_FILE = path.join(DATA_DIR, 'automation_queue.json');
const MAX_LOG_LINES = 500;
const POLL_INTERVAL_MS = 30000; // 30 secondes
const HEYGEN_API_KEY = process.env.HEYGEN_API_KEY || 'sk_V2_hgu_khW4FP1iEV5_48t3oD04Lj1W4b0E5LqUsqno33wJXcha';

class AutomationEngine {
  constructor() {
    this.isRunning = false;
    this.pollTimer = null;
    this.startTime = null;
    this.stats = {
      completedToday: 0,
      failedToday: 0,
      totalProcessed: 0
    };
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // ─── Logging ───────────────────────────────────────────────────────────────

  log(level, message, data = null) {
    const entry = {
      ts: new Date().toISOString(),
      level, // info | warn | error | success
      message,
      ...(data && { data })
    };
    console.log(`[automation] [${level.toUpperCase()}] ${message}`);

    try {
      let logs = [];
      if (fs.existsSync(LOG_FILE)) {
        logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
      }
      logs.push(entry);
      if (logs.length > MAX_LOG_LINES) logs = logs.slice(-MAX_LOG_LINES);
      fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
    } catch(e) {
      console.warn('[automation] Impossible d\'écrire le log:', e.message);
    }
  }

  // ─── Queue ─────────────────────────────────────────────────────────────────

  loadQueue() {
    try {
      if (fs.existsSync(QUEUE_FILE)) return JSON.parse(fs.readFileSync(QUEUE_FILE, 'utf8'));
    } catch(e) {}
    return [];
  }

  saveQueue(queue) {
    fs.writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2));
  }

  addJob(type, payload, priority = 2) {
    const queue = this.loadQueue();
    const job = {
      id: `job_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      type, // ugc_video | image_batch | cloner | custom
      payload,
      priority, // 3=high, 2=medium, 1=low
      status: 'pending',
      attempts: 0,
      maxAttempts: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    queue.push(job);
    // Trier par priorité (plus haute = premier)
    queue.sort((a, b) => b.priority - a.priority);
    this.saveQueue(queue);
    this.log('info', `Job ajouté: ${type} [${job.id}]`, { priority });
    return job;
  }

  // ─── Poll HeyGen jobs actifs ───────────────────────────────────────────────

  async pollHeyGenJobs() {
    const UGC_JOBS_FILE = path.join(DATA_DIR, 'ugc_jobs.json');
    const CLONER_JOBS_FILE = path.join(DATA_DIR, 'cloner_jobs.json');
    const DOWNLOADS_DIR = path.join(__dirname, 'public', 'downloads');

    for (const file of [UGC_JOBS_FILE, CLONER_JOBS_FILE]) {
      if (!fs.existsSync(file)) continue;

      let jobs;
      try {
        jobs = JSON.parse(fs.readFileSync(file, 'utf8'));
      } catch(e) { continue; }

      let updated = false;
      const activeJobs = jobs.filter(j => j.status === 'processing' && j.id && !j.id.startsWith('local_') && !j.id.startsWith('cloner_'));

      for (const job of activeJobs) {
        try {
          const res = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${job.id}`, {
            headers: { 'X-Api-Key': HEYGEN_API_KEY }
          });
          const data = await res.json();
          const status = data?.data?.status || '';

          if (status === 'completed' && data?.data?.video_url) {
            job.videoUrl = data.data.video_url;
            job.status = 'completed';
            job.completedAt = new Date().toISOString();
            updated = true;
            this.stats.completedToday++;
            this.stats.totalProcessed++;
            this.log('success', `Vidéo complétée: ${job.id}`, { url: job.videoUrl });

            // Télécharger si c'est un ugc job
            if (file === UGC_JOBS_FILE) {
              try {
                fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });
                const dlRes = await fetch(job.videoUrl);
                const buffer = await dlRes.buffer();
                const filename = `ugc_s${job.scriptIndex || 'x'}_${Date.now()}.mp4`;
                fs.writeFileSync(path.join(DOWNLOADS_DIR, filename), buffer);
                job.localPath = `/downloads/${filename}`;
                this.log('success', `Vidéo téléchargée: ${filename}`);
              } catch(dlE) {
                this.log('warn', `Download échoué pour ${job.id}: ${dlE.message}`);
              }
            }

          } else if (status === 'failed' || status === 'error') {
            job.status = 'failed';
            job.error = data?.data?.error || 'Erreur HeyGen';
            updated = true;
            this.stats.failedToday++;
            this.log('error', `Vidéo échouée: ${job.id}`, { error: job.error });
          }
        } catch(e) {
          this.log('warn', `Poll échoué pour job ${job.id}: ${e.message}`);
        }
      }

      if (updated) {
        try {
          fs.writeFileSync(file, JSON.stringify(jobs, null, 2));
        } catch(e) {}
      }
    }
  }

  // ─── Traitement queue ──────────────────────────────────────────────────────

  async processNextJob() {
    const queue = this.loadQueue();
    const pending = queue.filter(j => j.status === 'pending');
    if (pending.length === 0) return;

    const job = pending[0]; // Premier job (déjà trié par priorité)
    job.status = 'processing';
    job.startedAt = new Date().toISOString();
    job.attempts++;
    this.saveQueue(queue);

    this.log('info', `Traitement job: ${job.type} [${job.id}] (tentative ${job.attempts}/${job.maxAttempts})`);

    try {
      let result;

      if (job.type === 'ugc_video') {
        // Appel interne au pipeline UGC via HTTP local
        const res = await fetch('http://localhost:3002/api/ugc/pipeline/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(job.payload || {})
        });
        result = await res.json();

      } else if (job.type === 'image_batch') {
        const res = await fetch('http://localhost:3002/api/image-factory/batch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(job.payload || {})
        });
        result = await res.json();

      } else if (job.type === 'cloner') {
        // Analyse + génération
        const analyzeRes = await fetch('http://localhost:3002/api/cloner/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(job.payload)
        });
        const analyzed = await analyzeRes.json();

        if (analyzed.analysis && !analyzed.needsTranscript) {
          const genRes = await fetch('http://localhost:3002/api/cloner/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ analysis: analyzed.analysis, avatarGender: job.payload.avatarGender || 'female' })
          });
          result = await genRes.json();
        } else {
          result = analyzed;
        }

      } else {
        result = { skipped: true, reason: `Type inconnu: ${job.type}` };
      }

      job.status = 'completed';
      job.result = result;
      job.completedAt = new Date().toISOString();
      this.stats.completedToday++;
      this.stats.totalProcessed++;
      this.log('success', `Job complété: ${job.type} [${job.id}]`);

    } catch(e) {
      this.log('error', `Job échoué: ${job.type} [${job.id}]: ${e.message}`);

      if (job.attempts < job.maxAttempts) {
        // Retry avec backoff
        job.status = 'pending';
        const delay = Math.pow(2, job.attempts) * 5000; // 10s, 20s, 40s
        job.retryAfter = new Date(Date.now() + delay).toISOString();
        this.log('warn', `Retry dans ${delay/1000}s (tentative ${job.attempts}/${job.maxAttempts})`);
      } else {
        job.status = 'failed';
        job.error = e.message;
        this.stats.failedToday++;
      }
    }

    job.updatedAt = new Date().toISOString();
    this.saveQueue(queue);
  }

  // ─── Run All Pipeline ──────────────────────────────────────────────────────

  async runAllPipeline() {
    this.log('info', '🚀 Run All Pipeline déclenché');
    // UGC (priorité haute)
    this.addJob('ugc_video', {}, 3);
    // Image batch (priorité moyenne)
    this.addJob('image_batch', {}, 2);
    this.log('info', '2 jobs ajoutés à la queue (ugc_video + image_batch)');
  }

  // ─── Démarrage ─────────────────────────────────────────────────────────────

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.startTime = new Date().toISOString();
    this.log('info', '⚡ Automation Engine démarré');

    // Poll HeyGen toutes les 30s
    this.pollTimer = setInterval(async () => {
      try {
        await this.pollHeyGenJobs();
        await this.processNextJob();
      } catch(e) {
        this.log('error', `Cycle d'automation échoué: ${e.message}`);
      }
    }, POLL_INTERVAL_MS);

    // Premier cycle immédiat après 5s (laisser le serveur démarrer)
    setTimeout(async () => {
      try {
        await this.pollHeyGenJobs();
        await this.processNextJob();
      } catch(e) {
        this.log('error', `Premier cycle échoué: ${e.message}`);
      }
    }, 5000);
  }

  stop() {
    if (this.pollTimer) clearInterval(this.pollTimer);
    this.isRunning = false;
    this.log('info', '🛑 Automation Engine arrêté');
  }

  // ─── Status ────────────────────────────────────────────────────────────────

  getStatus() {
    const queue = this.loadQueue();
    let logs = [];
    try {
      if (fs.existsSync(LOG_FILE)) {
        logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
      }
    } catch(e) {}

    return {
      isRunning: this.isRunning,
      startTime: this.startTime,
      uptime: this.startTime ? Math.floor((Date.now() - new Date(this.startTime).getTime()) / 1000) + 's' : null,
      pollIntervalSeconds: POLL_INTERVAL_MS / 1000,
      queue: {
        total: queue.length,
        pending: queue.filter(j => j.status === 'pending').length,
        processing: queue.filter(j => j.status === 'processing').length,
        completed: queue.filter(j => j.status === 'completed').length,
        failed: queue.filter(j => j.status === 'failed').length
      },
      stats: this.stats,
      recentLogs: logs.slice(-20)
    };
  }
}

// Singleton
const engine = new AutomationEngine();
module.exports = engine;
