import { config } from '../config';
import fs from 'fs';
import path from 'path';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
}

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 1000;
  private logToFile = config.isProduction;

  constructor() {
    // Ensure logs directory exists in production
    if (this.logToFile) {
      this.ensureLogDirectory();
    }
  }

  private ensureLogDirectory() {
    const logDir = path.resolve(process.cwd(), 'logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  log(level: LogLevel, message: string, data?: any) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data
    };

    this.logs.unshift(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.pop();
    }

    // Write to file in production
    if (this.logToFile) {
      this.writeToFile(entry).catch(console.error);
    }

    const emoji = this.getEmoji(level);
    const coloredMessage = this.colorize(level, `${emoji} [${level.toUpperCase()}] ${message}`);
    
    console.log(coloredMessage);
    if (data && (config.isDevelopment || level === 'error')) {
      console.log(data);
    }
  }

  private async writeToFile(entry: LogEntry) {
    try {
      const logFile = path.resolve(process.cwd(), 'logs', 'app.log');
      const logLine = `${entry.timestamp} [${entry.level.toUpperCase()}] ${entry.message}${entry.data ? ' ' + JSON.stringify(entry.data) : ''}\n`;
      await fs.promises.appendFile(logFile, logLine);
    } catch (error) {
      console.error('Failed to write to log file:', error);
    }
  }

  private getEmoji(level: LogLevel): string {
    switch (level) {
      case 'info': return '💡';
      case 'warn': return '⚠️';
      case 'error': return '❌';
      case 'debug': return '🔍';
      default: return '📝';
    }
  }

  private colorize(level: LogLevel, message: string): string {
    const colors = {
      info: '\x1b[36m',    // cyan
      warn: '\x1b[33m',    // yellow
      error: '\x1b[31m',   // red
      debug: '\x1b[35m',   // magenta
      reset: '\x1b[0m'
    };

    return `${colors[level]}${message}${colors.reset}`;
  }

  getLogs(level?: LogLevel): LogEntry[] {
    if (level) {
      return this.logs.filter(log => log.level === level);
    }
    return this.logs;
  }

  info(message: string, data?: any) { this.log('info', message, data); }
  warn(message: string, data?: any) { this.log('warn', message, data); }
  error(message: string, data?: any) { this.log('error', message, data); }
  debug(message: string, data?: any) { this.log('debug', message, data); }

  // Additional debugging methods
  time(label: string) {
    console.time(label);
    this.debug(`⏱️ Timer started: ${label}`);
  }
  
  timeEnd(label: string) {
    console.timeEnd(label);
    this.debug(`⏱️ Timer ended: ${label}`);
  }
  
  trace(message: string, data?: any) {
    this.log('debug', `TRACE: ${message}`, data);
    if (config.isDevelopment) {
      console.trace();
    }
  }

  // Memory usage logging
  logMemoryUsage(label?: string) {
    const usage = process.memoryUsage();
    this.info(`💾 Memory usage${label ? ` (${label})` : ''}:`, {
      rss: `${Math.round(usage.rss / 1024 / 1024)}MB`,
      heapTotal: `${Math.round(usage.heapTotal / 1024 / 1024)}MB`,
      heapUsed: `${Math.round(usage.heapUsed / 1024 / 1024)}MB`,
      external: `${Math.round(usage.external / 1024 / 1024)}MB`,
      heapUsedPercent: `${Math.round((usage.heapUsed / usage.heapTotal) * 100)}%`
    });
  }
}

export const logger = new Logger();
