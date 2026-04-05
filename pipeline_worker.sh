#!/bin/bash
LESSONS_JSON="$1"
WORKER_ID="${2:-1}"
WORK_DIR=~/workspace/formations/whop-ecomtalent
SUMMARIES_DIR="$WORK_DIR/summaries"
TRANSCRIPTS_DIR="$WORK_DIR/transcripts"
LOGS_DIR="$WORK_DIR/logs"
SCRIPTS_DIR="$WORK_DIR/scripts"
GROQ_KEY="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"
mkdir -p "$SUMMARIES_DIR" "$TRANSCRIPTS_DIR" "$LOGS_DIR"
log()    { echo "[$(date '+%H:%M:%S')][W${WORKER_ID}] $*" | tee -a "$LOGS_DIR/worker_${WORKER_ID}.log"; }
log_err(){ echo "[$(date '+%H:%M:%S')][W${WORKER_ID}] ❌ $*" | tee -a "$LOGS_DIR/worker_${WORKER_ID}.log"; }
is_done() { local f="$SUMMARIES_DIR/${1}.md"; [ -f "$f" ] && [ $(wc -c < "$f") -gt 200 ]; }
total=$(python3 -c "import json,sys; print(len(json.load(open(sys.argv[1]))))" "$LESSONS_JSON")
log "🚀 Worker $WORKER_ID — $total leçons (subtitles)"
idx=0
python3 "$SCRIPTS_DIR/list_lessons.py" "$LESSONS_JSON" | while IFS='|' read -r lid lurl ltitle; do
    idx=$((idx+1))
    log "[$idx/$total] $lid"
    if is_done "$lid"; then log "  ⏭ Skip"; continue; fi
    raw=$(node "$SCRIPTS_DIR/whop_get_token.cjs" "$lurl" 2>/dev/null)
    hls=$(echo "$raw" | cut -f1)
    title=$(echo "$raw" | cut -f2)
    [ -z "$title" ] && title="$ltitle"
    if [ -z "$hls" ]; then log_err "  No token"; echo "$lid|FAILED|token" >> "$LOGS_DIR/failures.log"; continue; fi
    log "  🎬 Token OK"
    tfile="$TRANSCRIPTS_DIR/${lid}.txt"
    python3 "$SCRIPTS_DIR/extract_subs.py" "$hls" "$tfile" 2>&1 | while read l; do log "  $l"; done
    if [ ! -s "$tfile" ]; then log_err "  No subs"; echo "$lid|FAILED|subs" >> "$LOGS_DIR/failures.log"; continue; fi
    log "  ✅ $(wc -w < "$tfile") mots"
    sfile="$SUMMARIES_DIR/${lid}.md"
    GROQ_KEY="$GROQ_KEY" python3 "$SCRIPTS_DIR/whop_summarize.py" "$tfile" "$lid" "$title" > "$sfile"
    [ -s "$sfile" ] && log "  ✅ Résumé OK" || { log_err "  Groq échoué"; echo "$lid|FAILED|groq" >> "$LOGS_DIR/failures.log"; }
done
log "✅ Worker $WORKER_ID terminé"
