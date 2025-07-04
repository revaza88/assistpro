import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast"; // Import useToast
import { ServerMonitor } from '@/components/admin/ServerMonitor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, Shield } from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminToken, setAdminToken] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast(); // Initialize useToast

  useEffect(() => {
    // Check if admin token exists in localStorage
    const savedToken = localStorage.getItem('adminToken');
    if (savedToken) {
      setAdminToken(savedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Test the token by making a request to admin endpoint
      const response = await fetch('/api/admin/health', {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });

      if (response.ok) {
        localStorage.setItem('adminToken', adminToken);
        setIsAuthenticated(true);
        toast({ title: "Authenticated", description: "Access granted to admin panel." });
      } else {
        toast({ variant: "destructive", title: "Authentication Failed", description: "Invalid admin token. Please try again." });
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to connect to the server. Please check your connection." });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setAdminToken('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-2xl">Admin Panel</CardTitle>
            <p className="text-muted-foreground">
              Enter your admin token to access the dashboard
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="token" className="text-sm font-medium">
                Admin Token
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="token"
                  type="password"
                  placeholder="Enter admin token"
                  value={adminToken}
                  onChange={(e) => setAdminToken(e.target.value)}
                  className="pl-9"
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
            </div>
            <Button 
              onClick={handleLogin} 
              className="w-full" 
              disabled={!adminToken || loading}
            >
              {loading ? 'Authenticating...' : 'Access Dashboard'}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Development token: dev-admin-token-123
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ServerMonitor />
      </div>
    </div>
  );
}
