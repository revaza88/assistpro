#!/bin/sh
set -eu
stack=assistge-assistinfrastructure-gkq85y
docker ps --filter "name=$stack" --format '{{.Names}} {{.Status}}'
docker exec "$stack-backup-1" sh -ec '
  export PGPASSWORD="$(cat /run/secrets/postgres_password)"
  archive=$(find /backups -name "assistpro-*.dump" | sort | tail -n 1)
  test -n "$archive"
  restore_db="assist_restore_check_$(date +%s)"
  createdb "$restore_db"
  trap '\''dropdb --if-exists "$restore_db"'\'' EXIT
  pg_restore --exit-on-error --no-owner --dbname="$restore_db" "$archive"
  psql -X -v ON_ERROR_STOP=1 -d "$restore_db" -c "SELECT current_database(), count(*) AS public_tables FROM information_schema.tables WHERE table_schema = '\''public'\'';"
  echo "Restore verified from $archive"
'
docker inspect "$stack-postgres-1" --format 'Published ports: {{json .HostConfig.PortBindings}}'
docker logs --tail 2 "$stack-backup-1"
docker logs --tail 2 "$stack-health-monitor-1"
curl -fsS https://assist.ge/health
