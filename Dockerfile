# Production Dockerfile for AssistPro
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Install PM2 globally
RUN npm install -g pm2

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/ecosystem.config.js ./

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S assistpro -u 1001

# Create logs directory
RUN mkdir -p logs && chown -R assistpro:nodejs logs

USER assistpro

EXPOSE 3000

CMD ["pm2-runtime", "ecosystem.config.js"]
