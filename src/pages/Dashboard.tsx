import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, LogOut, Settings, AlertTriangle, CheckCircle, Clock, Shield, Home, Database, Bot } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { user, logout } = useAuth();
  
  // Get user's name from metadata or use email as fallback
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0 bg-gray-900 text-white">
        <div className="flex items-center h-16 px-4 border-b border-gray-800">
          <div className="h-8 w-8 rounded-md bg-primary mr-2 flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">O</span>
          </div>
          <h1 className="text-xl font-bold">OpenFix</h1>
        </div>
        <nav className="flex-1 pt-4 pb-4 overflow-y-auto">
          <div className="px-4 mb-2 text-sm font-medium text-gray-400">Main</div>
          <a href="#" className="flex items-center px-4 py-2 text-white bg-gray-800">
            <Home className="h-5 w-5 mr-3" />
            Dashboard
          </a>
          <a href="#" className="flex items-center px-4 py-2 mt-1 text-gray-300 hover:bg-gray-800">
            <Shield className="h-5 w-5 mr-3" />
            Vulnerabilities
            <Badge variant="outline" className="ml-auto bg-gray-800 text-gray-300">
              12
            </Badge>
          </a>
          <a href="#" className="flex items-center px-4 py-2 mt-1 text-gray-300 hover:bg-gray-800">
            <Database className="h-5 w-5 mr-3" />
            Assets
          </a>
          <a href="#" className="flex items-center px-4 py-2 mt-1 text-gray-300 hover:bg-gray-800">
            <Bot className="h-5 w-5 mr-3" />
            Assistant
          </a>
          
          <div className="px-4 mt-6 mb-2 text-sm font-medium text-gray-400">Settings</div>
          <a href="#" className="flex items-center px-4 py-2 mt-1 text-gray-300 hover:bg-gray-800">
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </a>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto" onClick={logout}>
              <LogOut className="h-5 w-5 text-gray-400" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        <header className="bg-background border-b border-border h-16 flex items-center justify-between px-4 md:px-6">
          <h1 className="text-xl font-bold md:hidden">OpenFix</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="h-9 w-9 md:hidden">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="p-4 md:p-6 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Welcome back, {userName}</h2>
              <p className="text-muted-foreground">Monitor your project vulnerabilities and security status</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
              <Button className="flex items-center gap-2">
                Start New Scan
              </Button>
            </div>
          </div>

          {/* Dashboard Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Vulnerabilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">36</div>
                <p className="text-xs text-muted-foreground mt-1">+2.5% from last month</p>
                <Progress value={36} max={100} className="h-1 mt-3" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Critical Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-500">8</div>
                <p className="text-xs text-muted-foreground mt-1">-14% from last month</p>
                <Progress value={8} max={100} className="h-1 mt-3 bg-red-100" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Fixed Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">24</div>
                <p className="text-xs text-muted-foreground mt-1">+42% from last month</p>
                <Progress value={24} max={100} className="h-1 mt-3 bg-green-100" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Security Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">78<span className="text-lg font-normal">/100</span></div>
                <p className="text-xs text-muted-foreground mt-1">+5 points from last month</p>
                <Progress value={78} max={100} className="h-1 mt-3" />
              </CardContent>
            </Card>
          </div>

          {/* Recent Vulnerabilities */}
          <div>
            <h3 className="text-xl font-bold mb-4">Recent Vulnerabilities</h3>
            <div className="grid gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-red-100 p-2 rounded-full mr-3">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <CardTitle>SQL Injection Vulnerability</CardTitle>
                        <CardDescription>api/users/profile endpoint</CardDescription>
                      </div>
                    </div>
                    <Badge variant="destructive">Critical</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    The endpoint is vulnerable to SQL injection attacks, potentially allowing unauthorized data access.
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Detected 2 days ago</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Ignore
                      </Button>
                      <Button size="sm">Fix Issue</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-amber-100 p-2 rounded-full mr-3">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                      </div>
                      <div>
                        <CardTitle>Outdated Dependencies</CardTitle>
                        <CardDescription>3 packages with known vulnerabilities</CardDescription>
                      </div>
                    </div>
                    <Badge variant="default" className="bg-amber-500">Medium</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Multiple dependencies are outdated and contain known security vulnerabilities.
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Detected 5 days ago</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Ignore
                      </Button>
                      <Button size="sm">Update Packages</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <AlertTriangle className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <CardTitle>Insecure Cookie Configuration</CardTitle>
                        <CardDescription>Authentication cookies missing secure flag</CardDescription>
                      </div>
                    </div>
                    <Badge variant="default" className="bg-blue-500">Low</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Authentication cookies are missing the secure flag, potentially allowing interception over unencrypted connections.
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Detected 1 week ago</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Ignore
                      </Button>
                      <Button size="sm">Fix Issue</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
