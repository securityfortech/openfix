
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Vulnerabilities = () => {
  const { user } = useAuth();
  
  // Get user's name from metadata or use email as fallback
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        <Header />
        <main className="p-4 md:p-6 space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Vulnerabilities</h2>
            <p className="text-muted-foreground">Monitor and manage security vulnerabilities</p>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="critical">Critical</TabsTrigger>
              <TabsTrigger value="medium">Medium</TabsTrigger>
              <TabsTrigger value="low">Low</TabsTrigger>
              <TabsTrigger value="fixed">Fixed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4 mt-4">
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
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <CardTitle>Cross-Site Scripting (XSS) Vulnerability</CardTitle>
                        <CardDescription>comments/submit endpoint</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-700">Fixed</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    This endpoint was vulnerable to XSS attacks but has been fixed by implementing proper input validation.
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Fixed 3 days ago</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="critical" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vulnerability</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Detected</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">SQL Injection Vulnerability</TableCell>
                    <TableCell>api/users/profile endpoint</TableCell>
                    <TableCell>2 days ago</TableCell>
                    <TableCell><Badge variant="destructive">Critical</Badge></TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Ignore</Button>
                        <Button size="sm">Fix Issue</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Remote Code Execution</TableCell>
                    <TableCell>file-upload service</TableCell>
                    <TableCell>1 day ago</TableCell>
                    <TableCell><Badge variant="destructive">Critical</Badge></TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Ignore</Button>
                        <Button size="sm">Fix Issue</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="medium" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vulnerability</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Detected</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Outdated Dependencies</TableCell>
                    <TableCell>3 packages with known vulnerabilities</TableCell>
                    <TableCell>5 days ago</TableCell>
                    <TableCell><Badge variant="default" className="bg-amber-500">Medium</Badge></TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Ignore</Button>
                        <Button size="sm">Update Packages</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="low" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vulnerability</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Detected</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Insecure Cookie Configuration</TableCell>
                    <TableCell>Authentication cookies missing secure flag</TableCell>
                    <TableCell>1 week ago</TableCell>
                    <TableCell><Badge variant="default" className="bg-blue-500">Low</Badge></TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Ignore</Button>
                        <Button size="sm">Fix Issue</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="fixed" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vulnerability</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Fixed Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Cross-Site Scripting (XSS) Vulnerability</TableCell>
                    <TableCell>comments/submit endpoint</TableCell>
                    <TableCell>3 days ago</TableCell>
                    <TableCell><Badge variant="outline" className="bg-green-100 text-green-700">Fixed</Badge></TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">View Details</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Vulnerabilities;
