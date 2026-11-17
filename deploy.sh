#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
target="${1:-staging}"
case "$target" in
  production) env_file='.env.production' ;;
  staging) env_file='.env.staging' ;;
  *) echo 'Usage: ./deploy.sh [staging|production]' >&2; exit 1 ;;
esac
[[ -f "$env_file" ]] || { echo "Prepare $env_file from .env.production.example first" >&2; exit 1; }
node --env-file="$env_file" scripts/check-environment.mjs
if [[ "$target" == 'staging' ]] && grep -Eq '^INDEXING_ENABLED=true' "$env_file"; then
  echo 'Staging must keep INDEXING_ENABLED=false' >&2; exit 1
fi
export APP_ENV_FILE="$env_file"
export ASSISTPRO_IMAGE="${ASSISTPRO_IMAGE:-assistpro:$(git rev-parse --short HEAD)}"
docker compose --env-file "$env_file" config --quiet
# Build and test before replacing the running container. No git pull or migrations.
docker compose --env-file "$env_file" build
docker compose --env-file "$env_file" up -d --no-build
curl --fail --silent --show-error --retry 12 --retry-connrefused --retry-delay 2 "${DEPLOY_HEALTH_URL:-http://127.0.0.1:3000/health}"
echo "Release $ASSISTPRO_IMAGE is healthy. Verify the public HTTPS origin before enabling indexing."
