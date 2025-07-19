# 🐛 AssistPro - Debug Guide

## 🔍 კოდის დებაგირების გზამკვლევი

### 📊 ძირითადი დებაგირების მეთოდები

#### 1. **Logger-ის გაუმჯობესება**

მიმდინარე logger-ი კარგია, მაგრამ შეიძლება დავამატოთ:

```typescript
// server/utils/logger.ts - დამატებითი ფუნქციები
class Logger {
  // არსებული კოდი...
  
  // დამატება: Performance ლოგინგი
  time(label: string) {
    console.time(label);
  }
  
  timeEnd(label: string) {
    console.timeEnd(label);
  }
  
  // დამატება: მეთოდების trace-ი
  trace(message: string, data?: any) {
    this.log('debug', `TRACE: ${message}`, data);
    console.trace();
  }
  
  // დამატება: ფაილში ჩაწერა (production-ისთვის)
  async writeToFile(entry: LogEntry) {
    if (config.isProduction) {
      const fs = await import('fs').then(m => m.promises);
      const logFile = 'logs/app.log';
      await fs.appendFile(logFile, JSON.stringify(entry) + '\n');
    }
  }
}
```

#### 2. **Request/Response ტრეისინგი**

```typescript
// server/middleware/requestTracing.ts
import { Request, Response, NextFunction } from "express";
import { nanoid } from "nanoid";
import { logger } from "../utils/logger";

export const requestTracing = (req: Request, res: Response, next: NextFunction) => {
  const traceId = nanoid(8);
  req.traceId = traceId;
  
  logger.info(`🔄 REQUEST START [${traceId}]`, {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  
  const startTime = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    logger.info(`✅ REQUEST END [${traceId}]`, {
      status: res.statusCode,
      duration: `${duration}ms`,
      headers: res.getHeaders()
    });
  });
  
  next();
};
```

#### 3. **Database Connection დებაგირება**

```typescript
// server/storage.ts - გაუმჯობესებული
export class MemStorage implements IStorage {
  async createContact(insertContact: InsertContact): Promise<Contact> {
    try {
      logger.debug('Creating contact', { insertContact });
      
      const id = this.currentContactId++;
      const newContact: Contact = {
        id,
        ...insertContact,
        createdAt: new Date().toISOString()
      };
      
      this.contacts.set(id, newContact);
      
      logger.info(`✅ Contact created successfully`, { 
        id, 
        email: newContact.email,
        totalContacts: this.contacts.size 
      });
      
      return newContact;
    } catch (error) {
      logger.error('❌ Failed to create contact', { 
        error: error.message, 
        stack: error.stack,
        insertContact 
      });
      throw error;
    }
  }
}
```

#### 4. **Environment-ის ვალიდაცია**

```typescript
// server/config/validation.ts
import { logger } from '../utils/logger';

export function validateEnvironment() {
  const required = ['NODE_ENV', 'PORT'];
  const optional = ['HOST', 'CORS_ORIGIN', 'LOG_LEVEL'];
  
  logger.info('🔧 Validating environment variables...');
  
  // Required ცვლადების შემოწმება
  for (const envVar of required) {
    if (!process.env[envVar]) {
      logger.error(`❌ Required environment variable missing: ${envVar}`);
      process.exit(1);
    }
  }
  
  // Optional ცვლადების ლოგინგი
  for (const envVar of optional) {
    if (process.env[envVar]) {
      logger.info(`✅ ${envVar}: ${process.env[envVar]}`);
    } else {
      logger.warn(`⚠️ Optional environment variable not set: ${envVar}`);
    }
  }
  
  logger.info('✅ Environment validation completed');
}
```

#### 5. **Error Boundaries Frontend-ისთვის**

```typescript
// client/src/components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('🚨 React Error Boundary caught an error:', error, errorInfo);
    
    // შეგიძლიათ აქ გააგზავნოთ error reporting service-ში
    if (process.env.NODE_ENV === 'production') {
      // მაგალითად: Sentry, LogRocket, ან სხვა
      // errorReporting.captureException(error, { extra: errorInfo });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                🚨 რაღაც არასწორად მოხდა
              </h2>
              <p className="text-gray-600 mb-4">
                დაფიქსირდა მოულოდნელი შეცდომა. გთხოვთ, განაახლოთ გვერდი.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                გვერდის განახლება
              </button>
              {process.env.NODE_ENV === 'development' && (
                <details className="mt-4 text-left">
                  <summary className="cursor-pointer text-sm text-gray-500">
                    Technical Details
                  </summary>
                  <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                    {this.state.error?.stack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### 🛠️ Debug Commands

#### Development-ში:
```bash
# Debug მოდით გაშვება
NODE_ENV=development LOG_LEVEL=debug npm run dev

# Specific component debugging
DEBUG=vite:* npm run dev
```

#### Production-ში:
```bash
# PM2 logs real-time-ში
pm2 logs assistpro --raw

# Memory usage monitoring
pm2 show assistpro

# Process monitoring
pm2 monit
```

### 🔍 ხშირი პრობლემები და მათი გადაწყვეტა

#### 1. **მეხსიერების გადიდება**
```bash
# ერორი: JavaScript heap out of memory
NODE_OPTIONS="--max-old-space-size=4096" npm start
```

#### 2. **Port conflicts**
```bash
# პორტის შემოწმება
netstat -tulpn | grep :3000
# ან
lsof -i :3000

# Process-ის მოკვლა
kill -9 $(lsof -t -i:3000)
```

#### 3. **ფაილების უფლებები**
```bash
# CloudPanel-ზე
chown -R www-data:www-data /home/assist/htdocs/assist.ge
chmod -R 755 /home/assist/htdocs/assist.ge
```

#### 4. **Build პრობლემები**
```bash
# Cache-ის გასუფთავება
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# TypeScript შემოწმება
npx tsc --noEmit
```

### 📊 Monitoring Dashboard

PM2 monitoring-ის გაუმჯობესება:
```bash
# PM2 Plus-ის დაყენება (უფასო monitoring)
npm install -g @pm2/io
pm2 install pm2-server-monit
```

### 🚨 Critical Error Alerting

```typescript
// server/utils/alerting.ts
export class AlertingService {
  static async sendAlert(error: Error, context: any) {
    if (process.env.NODE_ENV === 'production') {
      // Email ან Slack notification
      logger.error('🚨 CRITICAL ERROR ALERT', { error, context });
    }
  }
}
```

### 📝 Debug Checklist

ყოველი deployment-ის დროს:

- [ ] Environment variables არის განსაზღვრული
- [ ] Database connection მუშაობს
- [ ] ყველა dependency დაყენებულია
- [ ] Build წარმატებითაა დასრულებული
- [ ] Port-ები თავისუფალია
- [ ] PM2 process online-ია
- [ ] Logs არ აჩვენებს errors
- [ ] Health endpoint ბრუნებს 200-ს
- [ ] Static files ტვირთება
- [ ] SSL certificate მუშაობს (production-ში)
