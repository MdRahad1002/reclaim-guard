#!/usr/bin/env bash
#
# Deploy the latest main branch on the VPS.
#   ssh root@172.86.91.29 '/var/www/reclaim-guard/deploy.sh'
#
# Safe to re-run. .env is gitignored, so `git reset --hard` never touches it.
set -euo pipefail

APP=/var/www/reclaim-guard
PORT=3002
NAME=reclaim-guard

cd "$APP"

PREV=$(git rev-parse --short HEAD)
echo "==> Current commit: $PREV"

echo "==> Fetching origin/main..."
git fetch --all --quiet
git reset --hard origin/main --quiet

NEW=$(git rev-parse --short HEAD)
echo "==> Now at: $NEW"

if [ ! -f .env ]; then
    echo "ERROR: .env is missing at $APP/.env aborting." >&2
    exit 1
fi

echo "==> Installing production dependencies..."
npm ci --omit=dev --silent

echo "==> Restarting $NAME..."
pm2 restart "$NAME" --update-env >/dev/null
pm2 save --force >/dev/null

echo "==> Waiting for app to come up..."
for i in $(seq 1 10); do
    sleep 1
    CODE=$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:$PORT/" || echo 000)
    [ "$CODE" = "200" ] && break
done

if [ "$CODE" != "200" ]; then
    echo "FAILED: health check returned $CODE. Rolling back to $PREV." >&2
    git reset --hard "$PREV" --quiet
    npm ci --omit=dev --silent
    pm2 restart "$NAME" --update-env >/dev/null
    echo "Rolled back. Recent logs:" >&2
    pm2 logs "$NAME" --lines 20 --nostream >&2 || true
    exit 1
fi

echo "==> OK deployed $NEW (health check 200)"
