# CloudPanel Configuration for AssistPro

## Site Configuration
- **Site Type**: Node.js Application
- **Node.js Version**: 18.x or higher
- **Root Directory**: /home/[site-user]/htdocs/[site-name]
- **App Entry Point**: dist/index.js
- **App Port**: 3000

## Environment Variables
```
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://[db-user]:[db-password]@localhost:5432/[db-name]
ADMIN_TOKEN=[secure-token]
CORS_ORIGIN=https://[your-domain.com]
ENABLE_ADMIN_PANEL=true
ENABLE_RATE_LIMITING=true
ENABLE_COMPRESSION=true
ENABLE_MONITORING=true
LOG_LEVEL=info
```

## Database Setup
1. Create PostgreSQL database in CloudPanel
2. Note down credentials
3. Update DATABASE_URL in .env

## Build Process
```bash
npm ci --production
npm run build
```

## Process Management
- Use PM2 for process management
- Configuration file: `ecosystem.config.cjs`
- Auto-restart on failure
- Log rotation enabled

### PM2 Commands
```bash
# Start application
pm2 start ecosystem.config.cjs

# Stop application
pm2 stop assistpro

# Restart application
pm2 restart assistpro

# View logs
pm2 logs assistpro

# Monitor
pm2 monit
```

## Reverse Proxy (Nginx)
```nginx
location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}
```

## SSL Configuration
- Enable Let's Encrypt SSL in CloudPanel
- Force HTTPS redirect
- HSTS headers enabled

## Monitoring
- Health check endpoint: /health
- PM2 monitoring: `pm2 monit`
- Logs location: ./logs/ (error, output, combined)

## Backup Strategy
- Daily database backups
- Weekly full site backups
- Git repository as code backup
