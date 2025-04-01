
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Shield, AlertTriangle, CheckCircle } from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useAuth();

  // Mock vulnerability data
  const vulnerabilities = [
    { id: 1, title: "SQL Injection - API Endpoint", severity: "Critical", status: "Open" },
    { id: 2, title: "Cross-Site Scripting (XSS)", severity: "High", status: "In Progress" },
    { id: 3, title: "Outdated Library - React Router", severity: "Medium", status: "Open" },
    { id: 4, title: "Insecure Direct Object References", severity: "High", status: "Resolved" },
    { id: 5, title: "CSRF Vulnerability in Form", severity: "Medium", status: "Open" },
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
        <h2 className="text-2xl font-bold mb-6">Vulnerability Management Dashboard</h2>
        
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

        <h3 className="text-xl font-semibold mb-4">Vulnerability List</h3>
        <div className="bg-card rounded-lg overflow-hidden border">
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
