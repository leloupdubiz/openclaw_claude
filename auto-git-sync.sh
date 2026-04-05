#!/bin/bash
# Auto git sync for openclaw_claude
# Checks every 5 minutes for changes, commits and pushes automatically

REPO_DIR="/Users/moha.k2l/openclaw_claude"
INTERVAL=300  # 5 minutes

cd "$REPO_DIR" || exit 1

while true; do
    # Check for any changes (modified, new, deleted)
    if [ -n "$(git status --porcelain)" ]; then
        TIMESTAMP=$(date '+%Y-%m-%d %H:%M')

        # Stage all changes
        git add -A

        # Commit with timestamp
        git commit -m "🔄 Auto-sync $TIMESTAMP"

        # Push to remote
        git push origin main 2>/dev/null

        echo "[$TIMESTAMP] Synced changes to GitHub"
    fi

    sleep $INTERVAL
done
