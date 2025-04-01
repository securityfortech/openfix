import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, LayoutDashboard, Shield, Server, Activity, Bot, FileText, Settings, HelpCircle, AlertTriangle, CheckCircle, Bug } from "lucide-react";
import { useState } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator
} from "@/components/ui/sidebar";

// Dashboard metrics types
interface DashboardMetric {
  title: string;
  value: number;
  subtitle: string;
  change?: {
    value: string;
    type: "increase" | "decrease" | "neutral";
  };
  icon: React.ReactNode;
}

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
  const [activeView, setActiveView] = useState("dashboard");

  // Dashboard metrics data
  const metrics: DashboardMetric[] = [
    {
      title: "Total Assets",
      value: 0,
      subtitle: "Monitored devices",
      change: { value: "0%", type: "increase" },
      icon: <Server className="h-5 w-5 text-gray-500" />
    },
    {
      title: "Secure Assets",
      value: 0,
      subtitle: "No known vulnerabilities",
      change: { value: "5%", type: "increase" },
      icon: <Shield className="h-5 w-5 text-gray-500" />
    },
    {
      title: "Critical Assets",
      value: 0,
      subtitle: "Require immediate attention",
      change: { value: "2%", type: "decrease" },
      icon: <Shield className="h-5 w-5 text-gray-500" />
    },
    {
      title: "Open Vulnerabilities",
      value: 0,
      subtitle: "Unresolved security issues",
      change: { value: "8%", type: "decrease" },
      icon: <Activity className="h-5 w-5 text-gray-500" />
    }
  ];

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

  // Menu items for the sidebar
  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, view: "dashboard" },
    { title: "Vulnerabilities", icon: Shield, view: "vulnerabilities", badge: 5 },
    { title: "Assets", icon: Server, view: "assets" },
    { title: "Activity", icon: Activity, view: "activity" },
    { title: "Assistant", icon: Bot, view: "assistants" },
    { title: "Reports", icon: FileText, view: "reports" },
    { title: "Settings", icon: Settings, view: "settings" }
  ];

  const getChangeColor = (type: string) => {
    switch (type) {
      case "increase":
        return "text-green-500";
      case "decrease":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getChangeIcon = (type: string) => {
    return type === "increase" ? "↑" : type === "decrease" ? "↓" : "";
  };

  // Render content based on active view
  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
              <p className="text-muted-foreground">Overview of your system's security posture</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((metric, index) => (
                <Card key={index} className="border rounded-md shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-600 mb-1">{metric.title}</p>
                        <h3 className="text-3xl font-bold mb-1">{metric.value}</h3>
                        <p className="text-sm text-gray-500">{metric.subtitle}</p>
                        {metric.change && (
                          <p className="text-sm mt-2">
                            <span className={getChangeColor(metric.change.type)}>
                              {getChangeIcon(metric.change.type)} {metric.change.value} {metric.change.type}
                            </span>
                          </p>
                        )}
                      </div>
                      <div className="rounded-full p-2">
                        {metric.icon}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="col-span-2 border rounded-md shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Recent Vulnerabilities</h3>
                  <div className="h-48 flex items-center justify-center text-gray-500">
                    No recent vulnerabilities found.
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border rounded-md shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Vulnerability Severity</h3>
                  <div className="h-48 flex items-center justify-center text-gray-500">
                    No vulnerability data available
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

        case "vulnerabilities":
          return (
            <Card className="mb-6">
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
          );
  
        case "assets":
          return (
            <Card className="mb-6">
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
          );
  
        case "assistants":
          return (
            <Card className="mb-6">
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
          );
  
        case "settings":
          return (
            <Card className="mb-6">
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
          );

      case "activity":
        return (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Track user actions and system events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-3 font-medium">Event</th>
                      <th className="text-left p-3 font-medium">User</th>
                      <th className="text-left p-3 font-medium">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3">User logged in</td>
                      <td className="p-3">john.doe@example.com</td>
                      <td className="p-3">2024-08-15 10:30 AM</td>
                    </tr>
                    <tr>
                      <td className="p-3">Asset "API Server" updated</td>
                      <td className="p-3">admin@example.com</td>
                      <td className="p-3">2024-08-15 11:00 AM</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        );

      case "reports":
        return (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Security Reports</CardTitle>
              <CardDescription>Generate and view security reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button>Generate Report</Button>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-3 font-medium">Report Name</th>
                        <th className="text-left p-3 font-medium">Generated On</th>
                        <th className="text-left p-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3">Weekly Security Report</td>
                        <td className="p-3">2024-08-14</td>
                        <td className="p-3">
                          <Button variant="ghost" size="sm">View</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Select a menu item to view content</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider defaultOpen={true}>
        <div className="flex w-full min-h-screen">
          <Sidebar variant="sidebar" className="border-r-0" style={{ "--sidebar-background": "hsl(226, 27%, 10%)" } as React.CSSProperties}>
            <SidebarHeader className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">O</span>
                </div>
                <h1 className="text-xl font-bold text-white">OpenFix</h1>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      onClick={() => setActiveView(item.view)}
                      isActive={activeView === item.view}
                      tooltip={item.title}
                      className="text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <div className="ml-auto bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                          {item.badge}
                        </div>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>

            <SidebarSeparator className="bg-gray-700" />
            
            <SidebarFooter className="p-4">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => {}}
                    tooltip="Help & Support"
                    className="text-gray-300 hover:text-white hover:bg-gray-700"
                  >
                    <HelpCircle className="h-5 w-5" />
                    <span>Help & Support</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>

              <div className="flex flex-col gap-4 mt-4">
                <div className="text-sm text-sidebar-foreground/70">
                  {user?.fullName || user?.email}
                </div>
                <Button variant="outline" size="sm" onClick={logout} className="w-full text-gray-300 border-gray-700 hover:bg-gray-700 hover:text-white">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </SidebarFooter>
          </Sidebar>
          
          <div className="flex-1 p-6 bg-gray-50">
            <div className="container mx-auto">
              {renderContent()}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
