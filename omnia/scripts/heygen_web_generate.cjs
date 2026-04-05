#!/usr/bin/env node
// heygen_web_generate.cjs — Génère les 3 vidéos UGC via HeyGen Web UI
// Usage: node heygen_web_generate.cjs
// Prérequis: être connecté à HeyGen dans Chrome

const { chromium } = require('/opt/homebrew/lib/node_modules/playwright');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const COOKIES_FILE = path.join(__dirname, 'heygen_cookies.json');
const JOBS_FILE = path.join(__dirname, '..', 'data', 'ugc_jobs.json');
const OUT_DIR = path.join(__dirname, '..', 'public', 'downloads');

// ─── Scripts ───────────────────────────────────────────────────────────────

const SCRIPTS = [
  {
    index: 1,
    title: 'Der Teufelskreis',
    avatar: 'female',
    text: `Du schläfst schlecht WEIL du gestresst bist. Und du bist gestresst WEIL du schlecht schläfst.

Ich kenne das. Abends erschöpft ins Bett fallen — und trotzdem nicht einschlafen können. Morgens aufwachen und schon wieder fertig sein.

Das Problem ist: dein Körper kommt aus diesem Kreislauf nicht allein raus. Stress erhöht deinen Cortisolspiegel. Cortisol verhindert den Tiefschlaf. Und Schlafmangel — das haben Studien gezeigt — erhöht deinen Cortisol am nächsten Tag noch weiter.

Ich habe monatelang Melatonin probiert. Einschlafrituale. Früher ins Bett. Nichts hat diesen Kreislauf wirklich gebrochen.

Was mir geholfen hat? Ashwagandha KSM-66. Das ist die einzige Pflanze mit über fünf klinischen Studien — und einem nachgewiesenen Cortisol-Rückgang von fast 28 Prozent. Nicht über Nacht. Aber in zwei bis vier Wochen.

In Nellio UltraCalm ist genau das drin. Plus L-Theanin für die innere Ruhe abends. Magnesiumglycinat für das Nervensystem. Alles zusammen.

Nach drei Wochen habe ich zum ersten Mal seit Monaten morgens aufgewacht — und mich wirklich erholt gefühlt.

Wenn du aus diesem Kreislauf rauswillst: Der Link ist in der Bio. Nellio UltraCalm — 45 Tage testen, volles Geld-zurück wenn es nicht wirkt. Mehr als 20.000 Menschen haben es bereits ausprobiert. Du kannst es auch.`
  },
  {
    index: 2,
    title: 'Das Gedankenkarussell',
    avatar: 'male',
    text: `Das Gedankenkarussell nachts — das ist kein Willensproblem. Es ist Biologie.

22 Uhr. Ich lege mich hin. Ich bin erschöpft. Und trotzdem: der Kopf dreht weiter.

Das nächste Meeting. Die E-Mail die ich vergessen habe. Was ich morgen erledigen muss.

Ich dachte jahrelang: ich muss einfach lernen abzuschalten. Disziplinierter sein. Früher aufhören mit Arbeit.

Aber das Gedankenkarussell ist kein Charakterfehler. Wenn du unter chronischem Stress stehst, bleibt dein Nervensystem im Alarmmodus — auch wenn du eigentlich schlafen willst. Das ist physiologisch. Du kannst das nicht wegdenken.

L-Theanin — eine Aminosäure die auch im grünen Tee vorkommt — erzeugt Alpha-Gehirnwellen. Das ist buchstäblich der Zustand von wacher Entspannung. Der Zustand, den dein Gehirn allein gerade nicht mehr erreicht.

400 Milligramm davon sind in Nellio UltraCalm. Zusammen mit Ashwagandha KSM-66 — das nachweislich deinen Cortisolspiegel senkt — und Magnesiumglycinat.

Ich nehme es seit drei Wochen. Das Gedankenkarussell ist nicht verschwunden. Aber es dreht langsamer. Und ich schlafe durch.

Nellio UltraCalm. Link in der Bio. 45 Tage — wenn es nicht wirkt, bekommst du alles zurück.`
  },
  {
    index: 3,
    title: 'Cortisol nachts',
    avatar: 'male',
    text: `Dein Cortisol ist nachts noch aktiv — deshalb schläfst du schlecht, egal wie früh du ins Bett gehst.

Ich hab das nicht geglaubt als ich es zum ersten Mal gelesen habe.

Aber wenn du unter Dauerstress stehst — und wer ist das heute nicht — dann bleibt dein Cortisolspiegel abends zu hoch. Cortisol ist dein Stresshormon. Und sein Job ist es, deinen Körper wach und alert zu halten.

Das bedeutet: selbst wenn du todmüde bist, selbst wenn du um 21 Uhr ins Bett gehst — dein Körper kommt nicht in den Tiefschlaf. Weil Cortisol das blockiert.

Die meisten Schlafmittel und Melatonin-Präparate lösen dieses Problem nicht. Sie helfen dir einzuschlafen. Aber sie senken deinen Cortisol nicht.

Ashwagandha KSM-66 — das ist der Wirkstoff der das kann. In 45 klinischen Studien mit über 3.800 Patienten wurde eine Cortisol-Reduktion von fast 28 Prozent nachgewiesen. Das sind veröffentlichte Daten.

Nellio UltraCalm hat 300 Milligramm KSM-66 — plus L-Theanin und Magnesiumglycinat, die zusammen das Nervensystem runterregeln.

Ich merke den Unterschied. Nicht sofort — aber nach zwei Wochen hat mein Schlaf sich verändert. Ich wache morgens anders auf.

Wenn du wissen willst ob es bei dir funktioniert: 45 Tage Geld-zurück-Garantie. Nellio UltraCalm. Link ist unten. 4,8 von 5 Sternen — über 20.000 Bewertungen. Teste es selbst.`
  }
];

// ─── Cookie extraction ──────────────────────────────────────────────────────

function refreshCookies() {
  const code = `
import pycookiecheat, json, time, os
cf = r'${COOKIES_FILE}'
if os.path.exists(cf) and (time.time() - os.path.getmtime(cf)) < 3600:
    exit(0)
try:
    c = pycookiecheat.chrome_cookies('https://app.heygen.com', browser='Chrome')
    json.dump([{'name':k,'value':v,'domain':'.heygen.com','path':'/'} for k,v in c.items()], open(cf,'w'))
    print(str(len(c))+' cookies ok')
except Exception as e:
    print('Cookie error: '+str(e))
`;
  const tmp = '/tmp/hg_cookies_' + Date.now() + '.py';
  fs.writeFileSync(tmp, code);
  try { execSync('python3 ' + tmp, { timeout: 30000, stdio: 'inherit' }); } catch(e) {}
  try { fs.unlinkSync(tmp); } catch {}
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function updateJob(index, updates) {
  let jobs = [];
  if (fs.existsSync(JOBS_FILE)) {
    try { jobs = JSON.parse(fs.readFileSync(JOBS_FILE, 'utf8')); } catch {}
  }
  const idx = jobs.findIndex(j => j.scriptIndex === index);
  const job = idx >= 0 ? jobs[idx] : { scriptIndex: index };
  Object.assign(job, updates);
  if (idx >= 0) jobs[idx] = job; else jobs.push(job);
  fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2));
}

function log(msg) {
  const ts = new Date().toISOString().substring(11, 19);
  console.log(`[${ts}] ${msg}`);
}

// ─── Main ────────────────────────────────────────────────────────────────────

(async () => {
  log('🚀 HeyGen Web Automation — 3 scripts UGC');

  // 1. Cookies Chrome
  log('📦 Extraction cookies Chrome...');
  refreshCookies();

  const cookies = fs.existsSync(COOKIES_FILE)
    ? JSON.parse(fs.readFileSync(COOKIES_FILE, 'utf8'))
    : [];

  if (cookies.length === 0) {
    log('❌ Aucun cookie — connecte-toi à HeyGen dans Chrome d\'abord');
    process.exit(1);
  }
  log(`✅ ${cookies.length} cookies chargés`);

  // 2. Lancer Playwright (headless)
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  });

  await context.addCookies(cookies);

  for (const script of SCRIPTS) {
    log(`\n🎬 Script ${script.index} — ${script.title}`);
    updateJob(script.index, { status: 'web_generating', scriptTitle: script.title, scriptIndex: script.index, createdAt: new Date().toISOString() });

    const page = await context.newPage();

    try {
      // 3. Aller sur Script to video
      await page.goto('https://app.heygen.com/avatar', { waitUntil: 'networkidle', timeout: 30000 });

      // Vérifier qu'on est connecté
      const title = await page.title();
      if (title.includes('Sign') || title.includes('Login')) {
        log('❌ Non connecté — session expirée');
        updateJob(script.index, { status: 'failed', error: 'Session expirée — relancer avec Chrome ouvert sur HeyGen' });
        break;
      }

      // 4. Cliquer "Script to video" dans le menu
      const scriptBtn = page.locator('button:has-text("Script to video")');
      if (await scriptBtn.count() > 0) await scriptBtn.first().click();
      await page.waitForTimeout(1500);

      // 5. Sélectionner l'avatar selon le genre
      const chooseAvatarTab = page.locator('text=Choose Avatar');
      if (await chooseAvatarTab.count() > 0) {
        await chooseAvatarTab.click();
        await page.waitForTimeout(1000);

        // Chercher un avatar femme ou homme selon script.avatar
        const searchInput = page.locator('input[placeholder*="Search"], input[placeholder*="search"]').first();
        if (await searchInput.count() > 0) {
          await searchInput.fill(script.avatar === 'female' ? 'femme' : 'homme');
          await page.waitForTimeout(800);
        }

        // Cliquer le premier avatar disponible
        const avatarCard = page.locator('[class*="avatar-card"], [class*="AvatarCard"], [class*="avatar_card"]').first();
        if (await avatarCard.count() > 0) {
          await avatarCard.click();
          await page.waitForTimeout(500);
        }

        // Revenir à Add Script
        const addScriptTab = page.locator('text=Add Script');
        if (await addScriptTab.count() > 0) await addScriptTab.click();
        await page.waitForTimeout(800);
      }

      // 6. Coller le script
      const textarea = page.locator('textarea, [contenteditable="true"]').first();
      await textarea.click();
      await textarea.fill(script.text);
      log(`✅ Script collé (${script.text.length} chars)`);
      await page.waitForTimeout(1000);

      // 7. Cliquer Generate video
      const generateBtn = page.locator('button:has-text("Generate video"), button:has-text("Generate Video")');
      if (await generateBtn.count() === 0) {
        log('⚠️ Bouton Generate non trouvé — screenshot de debug');
        await page.screenshot({ path: `/tmp/heygen_debug_s${script.index}.png` });
        updateJob(script.index, { status: 'failed', error: 'Bouton Generate video non trouvé' });
        continue;
      }

      await generateBtn.first().click();
      log('🎯 Generate video cliqué — attente confirmation...');
      await page.waitForTimeout(3000);

      // 8. Capturer l'ID job depuis l'URL ou la réponse
      const currentUrl = page.url();
      const videoId = currentUrl.match(/\/video\/([a-f0-9]+)/)?.[1]
        || currentUrl.match(/id=([a-f0-9]+)/)?.[1]
        || `web_${Date.now()}_s${script.index}`;

      log(`✅ Vidéo lancée — ID: ${videoId}`);
      updateJob(script.index, {
        id: videoId,
        status: 'processing',
        webGenerated: true,
        scriptTitle: script.title,
        scriptHook: script.text.split('\n')[0],
        createdAt: new Date().toISOString(),
        videoUrl: null,
        error: null
      });

      await page.screenshot({ path: `/tmp/heygen_s${script.index}_launched.png` });

    } catch(e) {
      log(`❌ Erreur S${script.index}: ${e.message}`);
      updateJob(script.index, { status: 'failed', error: e.message });
      await page.screenshot({ path: `/tmp/heygen_error_s${script.index}.png` }).catch(() => {});
    } finally {
      await page.close();
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  await browser.close();
  log('\n✅ Pipeline terminé — vérifie app.heygen.com/projects pour le statut');
  log('📁 Screenshots debug dans /tmp/heygen_*.png');

})();
