
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Shield, AlertTriangle, CheckCircle, LayoutDashboard, Bug, Server, Bot, Settings as SettingsIcon } from "lucide-react";
import { useState } from "react";

// Define interfaces for our data types
interface Vulnerability {
  id: number;
  title: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Resolved";
  assignedTo?: string;
}

interface Asset {
  id: number;
  name: string;
  type: string;
  status: "Active" | "Inactive" | "Maintenance";
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock vulnerability data
  const vulnerabilities: Vulnerability[] = [
    { id: 1, title: "SQL Injection - API Endpoint", severity: "Critical", status: "Open" },
    { id: 2, title: "Cross-Site Scripting (XSS)", severity: "High", status: "In Progress", assignedTo: "Jane Doe" },
    { id: 3, title: "Outdated Library - React Router", severity: "Medium", status: "Open" },
    { id: 4, title: "Insecure Direct Object References", severity: "High", status: "Resolved" },
    { id: 5, title: "CSRF Vulnerability in Form", severity: "Medium", status: "Open" },
  ];

  // Mock asset data
  const assets: Asset[] = [
    { id: 1, name: "Main API Server", type: "Server", status: "Active" },
    { id: 2, name: "User Database", type: "Database", status: "Active" },
    { id: 3, name: "Legacy Web App", type: "Application", status: "Maintenance" },
    { id: 4, name: "Admin Dashboard", type: "Application", status: "Active" },
    { id: 5, name: "Backup Server", type: "Server", status: "Inactive" },
  ];

  // Count stats
  const openCount = vulnerabilities.filter(v => v.status === "Open").length;
  const highSeverityCount = vulnerabilities.filter(v => v.severity === "Critical" || v.severity === "High").length;
  const resolvedCount = vulnerabilities.filter(v => v.status === "Resolved").length;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "text-red-500";
      case "High": return "text-orange-500";
      case "Medium": return "text-yellow-500";
      case "Low": return "text-green-500";
      default: return "";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Open": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "In Progress": return <Shield className="h-4 w-4 text-orange-500" />;
      case "Resolved": return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return null;
    }
  };

  const getAssetStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "text-green-500";
      case "Inactive": return "text-red-500";
      case "Maintenance": return "text-yellow-500";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">O</span>
            </div>
            <h1 className="text-xl font-bold">OpenFix</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm">
              {user?.fullName || user?.email}
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Vulnerability Management</h2>
        
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="w-full justify-start mb-8">
            <TabsTrigger value="dashboard" onClick={() => setActiveTab("dashboard")}>
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="vulnerabilities" onClick={() => setActiveTab("vulnerabilities")}>
              <Bug className="h-4 w-4 mr-2" />
              Vulnerabilities
            </TabsTrigger>
            <TabsTrigger value="assets" onClick={() => setActiveTab("assets")}>
              <Server className="h-4 w-4 mr-2" />
              Assets
            </TabsTrigger>
            <TabsTrigger value="assistants" onClick={() => setActiveTab("assistants")}>
              <Bot className="h-4 w-4 mr-2" />
              Assistants
            </TabsTrigger>
            <TabsTrigger value="settings" onClick={() => setActiveTab("settings")}>
              <SettingsIcon className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab Content */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-orange-500 text-lg">{openCount}</CardTitle>
                  <CardDescription>Open Vulnerabilities</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-red-500 text-lg">{highSeverityCount}</CardTitle>
                  <CardDescription>High Severity Issues</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-green-500 text-lg">{resolvedCount}</CardTitle>
                  <CardDescription>Resolved Issues</CardDescription>
                </CardHeader>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Vulnerabilities</CardTitle>
                <CardDescription>Latest security issues detected in your systems</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-3 font-medium">Title</th>
                        <th className="text-left p-3 font-medium">Severity</th>
                        <th className="text-left p-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vulnerabilities.slice(0, 3).map((vuln) => (
                        <tr key={vuln.id} className="border-b last:border-b-0 hover:bg-muted/50">
                          <td className="p-3">{vuln.title}</td>
                          <td className="p-3">
                            <span className={getSeverityColor(vuln.severity)}>
                              {vuln.severity}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1">
                              {getStatusIcon(vuln.status)}
                              <span>{vuln.status}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vulnerabilities Tab Content */}
          <TabsContent value="vulnerabilities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Vulnerabilities</CardTitle>
                <CardDescription>Manage and track all security issues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Filter</Button>
                    <Button variant="outline" size="sm">Search</Button>
                  </div>
                  <Button size="sm">Add New</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-3 font-medium">Title</th>
                        <th className="text-left p-3 font-medium">Severity</th>
                        <th className="text-left p-3 font-medium">Status</th>
                        <th className="text-left p-3 font-medium">Assigned To</th>
                        <th className="text-left p-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vulnerabilities.map((vuln) => (
                        <tr key={vuln.id} className="border-b last:border-b-0 hover:bg-muted/50">
                          <td className="p-3">{vuln.title}</td>
                          <td className="p-3">
                            <span className={getSeverityColor(vuln.severity)}>
                              {vuln.severity}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1">
                              {getStatusIcon(vuln.status)}
                              <span>{vuln.status}</span>
                            </div>
                          </td>
                          <td className="p-3">{vuln.assignedTo || "Unassigned"}</td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assets Tab Content */}
          <TabsContent value="assets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Asset Management</CardTitle>
                <CardDescription>Manage your organization's digital assets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Filter</Button>
                    <Button variant="outline" size="sm">Search</Button>
                  </div>
                  <Button size="sm">Add Asset</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-3 font-medium">Name</th>
                        <th className="text-left p-3 font-medium">Type</th>
                        <th className="text-left p-3 font-medium">Status</th>
                        <th className="text-left p-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assets.map((asset) => (
                        <tr key={asset.id} className="border-b last:border-b-0 hover:bg-muted/50">
                          <td className="p-3">{asset.name}</td>
                          <td className="p-3">{asset.type}</td>
                          <td className="p-3">
                            <span className={getAssetStatusColor(asset.status)}>
                              {asset.status}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">View</Button>
                              <Button variant="ghost" size="sm">Edit</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assistants Tab Content */}
          <TabsContent value="assistants" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Security Assistant</CardTitle>
                <CardDescription>Get AI-powered recommendations for your security issues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div className="bg-muted p-4 rounded-lg h-64 overflow-y-auto">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-primary/10 p-3 rounded-lg max-w-[80%]">
                          <p className="text-sm">Hello! I'm your AI security assistant. I can help analyze vulnerabilities and provide recommendations. What would you like to know?</p>
                        </div>
                      </div>
                      {/* You can add more message bubbles here */}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Ask a security question..." 
                      className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button>Send</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab Content */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Settings</CardTitle>
                <CardDescription>Manage your profile and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Profile Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Full Name</label>
                        <input 
                          type="text" 
                          value={user?.fullName || ""} 
                          className="w-full p-2 border rounded-md"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input 
                          type="email" 
                          value={user?.email} 
                          className="w-full p-2 border rounded-md" 
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Notification Preferences</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="email-notifications" className="mr-2" />
                        <label htmlFor="email-notifications">Email notifications for new vulnerabilities</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="status-updates" className="mr-2" />
                        <label htmlFor="status-updates">Status change notifications</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="weekly-digest" className="mr-2" />
                        <label htmlFor="weekly-digest">Weekly security digest</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Save Settings</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
