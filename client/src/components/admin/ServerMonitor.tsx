import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Activity, AlertTriangle, Info } from 'lucide-react';

interface ServerStats {
  server: {
    uptime: number;
    environment: string;
    nodeVersion: string;
    memoryUsage: NodeJS.MemoryUsage;
    pid: number;
  };
  logs: {
    total: number;
    errors: number;
    warnings: number;
    info: number;
  };
  timestamp: string;
}

interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  data?: any;
}

export function ServerMonitor() {
  const [stats, setStats] = useState<ServerStats | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isOnline, setIsOnline] = useState(true);
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [statsResponse, logsResponse] = await Promise.all([
        fetch('/api/admin/dashboard', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken') || 'dev-admin-token-123'}`
          }
        }),
        fetch('/api/admin/logs?limit=50', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken') || 'dev-admin-token-123'}`
          }
        })
      ]);

      if (statsResponse.ok && logsResponse.ok) {
        const statsData = await statsResponse.json();
        const logsData = await logsResponse.json();
        
        setStats(statsData.data);
        setLogs(logsData.data);
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
    } catch (error) {
      setIsOnline(false);
      console.error('Failed to fetch server stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    
    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(fetchStats, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const formatMemory = (bytes: number) => {
    return `${Math.round(bytes / 1024 / 1024)}MB`;
  };

  const getLogIcon = (level: string) => {
    switch (level) {
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warn': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info': return <Info className="h-4 w-4 text-blue-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold">Server Monitor</h1>
          <Badge variant={isOnline ? "default" : "destructive"}>
            {isOnline ? "🟢 Online" : "🔴 Offline"}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            {autoRefresh ? "Pause" : "Resume"} Auto-refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchStats}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats ? formatUptime(stats.server.uptime) : "--"}
            </div>
            <p className="text-xs text-muted-foreground">
              Environment: {stats?.server.environment || "--"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
            <span className="text-lg">🧠</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats ? formatMemory(stats.server.memoryUsage.heapUsed) : "--"}
            </div>
            <p className="text-xs text-muted-foreground">
              / {stats ? formatMemory(stats.server.memoryUsage.heapTotal) : "--"} heap
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Logs</CardTitle>
            <span className="text-lg">📝</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.logs.total || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.logs.info || 0} info, {stats?.logs.warnings || 0} warnings
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Errors</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {stats?.logs.errors || 0}
            </div>
            <p className="text-xs text-muted-foreground">Last 24h</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {logs.length > 0 ? (
              logs.map((log, index) => (
                <div key={index} className="flex items-start space-x-3 text-sm border-b pb-2">
                  {getLogIcon(log.level)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{log.level.toUpperCase()}</span>
                      <span className="text-muted-foreground text-xs">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{log.message}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-4">No logs available</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
