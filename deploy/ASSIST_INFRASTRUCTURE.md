# Assist infrastructure — 2026-11-27

Dokploy project: `assist.ge`, production environment.
Compose service: `assist-infrastructure` (`assistge-assistinfrastructure-gkq85y`).
Dashboard: https://host.marte.team/dashboard/project/hAtHi-5mzzlhRONLpsdGW/environment/qiexmRohcyzhm8aiHSBTS/services/compose/7dFwmynNZPZifsaMys4O0

## Deployed

- PostgreSQL 17: database/user `assistpro`, persistent data volume, isolated internal Compose network, no published ports. This is an empty infrastructure database, not an integrated application database. The initialization user is an owner; create a separate least-privilege runtime role when implementing migrations and application access.
- Backup sidecar: official PostgreSQL image, custom-format dump on startup and every 86400 seconds; validates archive listing before publishing it, removes matching dumps older than 14 days, health check fails when the last successful backup is more than 25 hours old.
- Health monitor: official Node 24 image; checks `https://assist.ge/health` every 60 seconds and records the result in container logs and Docker health. It has no email/webhook delivery and is on the same host as the website.
- Resource caps: PostgreSQL 512 MiB/1 CPU, backup 256 MiB/0.5 CPU, monitor 128 MiB/0.25 CPU. Rotated Docker logs (10 MiB × 3 per service).
- Random database password stored only at `/etc/dokploy/assist-infrastructure/postgres-password` on the server, beneath a root-only directory, mounted as a read-only Compose secret. No password or new Dokploy API key was placed in this repository or Windows environment.

## Verification

All three containers reported healthy. First dump `assistpro-20261127T121713Z.dump` restored successfully into a uniquely named temporary database; the temporary database was then removed. The source database had zero public tables, so this verifies an empty-database restore, not application-data recovery. Database published ports were `{}`. The public health endpoint remained `ok` and its existing process uptime continued without restart.

The initial deployment failed on Dokploy's default sample before any new container was created; the editor input was corrected and the subsequent deployment completed. Existing website configuration was not changed.

`assist-infrastructure.compose.yaml` is the equivalent reproducible definition. Dokploy currently holds the deployed Raw configuration. Use the dashboard for deployment changes; do not launch a second independent Compose project from this file. `verify-assist-infrastructure.sh` runs on the Docker host as an authorized operator and creates/removes a temporary restore database.

## Remaining integration work

1. Implement application PostgreSQL storage, migrations, transaction/idempotency logic, runtime role, and a private application-to-database network. The current website has not been connected to this database.
2. Select a separate off-host backup destination and test recovery there. Current dumps share the server's disk and do not protect against complete host/disk loss.
3. Configure a confirmed alert recipient/channel. Current health monitoring records failures but does not contact a human; an external monitor is also needed to detect complete host loss.
4. Configure an email provider and AI provider only with the relevant account credentials and budgets. Staff authorization, portal, and CMS need application development, not just container installation.
5. Reconcile the currently deployed website runtime (observed Node 20.19.5 via health) with the repository requirement (Node 24+) in a separately tested website release.

Do not remove the `postgres-data` or `postgres-backups` volumes during normal redeployment. Preserve the server secret separately in the operator's secure recovery process.
