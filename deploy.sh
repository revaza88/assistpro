#!/bin/bash

# AssistPro Deployment Script for CloudPanel
# Usage: ./deploy.sh [production|staging]

set -e

ENV=${1:-production}
PROJECT_NAME="assistpro"
BACKUP_DIR="/tmp/backup-$(date +%Y%m%d-%H%M%S)"

echo "🚀 Starting deployment for $ENV environment..."

# 1. Create backup
echo "📦 Creating backup..."
mkdir -p $BACKUP_DIR
cp -r dist/ $BACKUP_DIR/ 2>/dev/null || echo "No existing dist/ directory"
cp .env $BACKUP_DIR/ 2>/dev/null || echo "No existing .env file"

# 2. Pull latest code
echo "🔄 Pulling latest code..."
git pull origin main

# 3. Install dependencies
echo "📥 Installing dependencies..."
npm ci --production

# 4. Build application
echo "🏗️  Building application..."
npm run build

# 5. Database migration
echo "🗃️  Running database migrations..."
npm run db:push

# 6. Restart application
echo "♻️  Restarting application..."
pm2 restart $PROJECT_NAME || pm2 start ecosystem.config.js

# 7. Health check
echo "🏥 Running health check..."
sleep 5
curl -f http://localhost:3000/health || echo "Health check failed"

# 8. Cleanup
echo "🧹 Cleaning up..."
npm prune --production

echo "✅ Deployment completed successfully!"
echo "🌐 Application is running at: http://localhost:3000"
echo "🔧 Admin panel: http://localhost:3000/admin"

# Optional: Send notification
# curl -X POST "https://api.telegram.org/bot<TOKEN>/sendMessage" \
#      -d "chat_id=<CHAT_ID>&text=✅ $PROJECT_NAME deployed successfully to $ENV"
