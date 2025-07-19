# CloudPanel Deployment Guide for AssistPro

## 📋 Pre-deployment Checklist

### ✅ Prerequisites Check:
- [ ] Node.js 18+ installed on server
- [ ] npm installed
- [ ] PM2 installed globally
- [ ] PostgreSQL database created
- [ ] Domain/subdomain configured
- [ ] SSL certificate ready

## 🚀 Deployment Steps

### 1. File Upload
```bash
# Upload files to CloudPanel site directory
scp -r ./* msa@192.168.100.10:/home/msa/htdocs/assistpro/
```

### 2. Server Setup
```bash
ssh msa@192.168.100.10
cd /home/msa/htdocs/assistpro

# Install dependencies
npm ci --production

# Copy environment file
cp .env.example .env
nano .env  # Edit with your actual values
```

### 3. Environment Configuration
Edit `.env` file with these values:
```env
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
DATABASE_URL=postgresql://msa_assistpro:PASSWORD@localhost:5432/msa_assistpro
CORS_ORIGIN=https://your-domain.com
ADMIN_TOKEN=your-secure-token
ENABLE_RATE_LIMITING=true
ENABLE_COMPRESSION=true
ENABLE_MONITORING=true
LOG_LEVEL=info
```

### 4. Build & Start
```bash
# Build the application
npm run build

# Create logs directory
mkdir -p logs

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 5. CloudPanel Configuration

#### Nginx Vhost Configuration:
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

### 6. Database Setup
```sql
CREATE DATABASE msa_assistpro;
CREATE USER msa_assistpro WITH PASSWORD 'your-secure-password';
GRANT ALL PRIVILEGES ON DATABASE msa_assistpro TO msa_assistpro;
```

## 🔧 Maintenance Commands

```bash
# Check status
pm2 status

# View logs
pm2 logs assistpro

# Restart application
pm2 restart assistpro

# Update application
./deploy.sh production

# Health check
curl https://your-domain.com/health
```

## 🛠️ Troubleshooting

### Common Issues:

1. **Port already in use**
   ```bash
   lsof -i :3000
   kill -9 <PID>
   ```

2. **Permission issues**
   ```bash
   chown -R msa:msa /home/msa/htdocs/assistpro
   chmod +x deploy.sh
   ```

3. **Database connection**
   - Check PostgreSQL is running
   - Verify credentials in .env
   - Test connection: `psql $DATABASE_URL`

4. **SSL issues**
   - Enable Let's Encrypt in CloudPanel
   - Force HTTPS redirect
   - Update CORS_ORIGIN to use https://

## 📊 Monitoring

- Application logs: `/home/msa/htdocs/assistpro/logs/`
- PM2 monitoring: `pm2 monit`
- Health endpoint: `https://your-domain.com/health`
- CloudPanel monitoring dashboard

## 🔄 Updates

For future updates:
```bash
ssh msa@192.168.100.10
cd /home/msa/htdocs/assistpro
./deploy.sh production
```

## 📞 Support

If you encounter issues:
1. Check application logs
2. Verify environment variables
3. Test database connectivity
4. Confirm port availability
5. Review nginx configuration
