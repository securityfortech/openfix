
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Database, Shield } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Assets = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        <Header />
        <main className="p-4 md:p-6 space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Assets</h2>
            <p className="text-muted-foreground">Manage and monitor your application assets</p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  <span>Total Assets</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">164</div>
                <p className="text-muted-foreground text-sm">Across all environments</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-red-500" />
                  <span>Vulnerable Assets</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">17</div>
                <p className="text-muted-foreground text-sm">Assets with security issues</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span>Protected Assets</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">147</div>
                <p className="text-muted-foreground text-sm">Assets with no known issues</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Assets</TabsTrigger>
              <TabsTrigger value="servers">Servers</TabsTrigger>
              <TabsTrigger value="databases">Databases</TabsTrigger>
              <TabsTrigger value="apis">APIs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Asset Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Environment</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Scan</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">api-gateway</TableCell>
                        <TableCell>API</TableCell>
                        <TableCell>Production</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-100 text-green-700">Secured</Badge>
                        </TableCell>
                        <TableCell>2 days ago</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Scan Now</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">user-database</TableCell>
                        <TableCell>Database</TableCell>
                        <TableCell>Production</TableCell>
                        <TableCell>
                          <Badge variant="destructive">Vulnerable</Badge>
                        </TableCell>
                        <TableCell>1 day ago</TableCell>
                        <TableCell>
                          <Button size="sm">Fix Issues</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">auth-service</TableCell>
                        <TableCell>API</TableCell>
                        <TableCell>Production</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-amber-100 text-amber-700">Warning</Badge>
                        </TableCell>
                        <TableCell>3 days ago</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Review</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">web-server-01</TableCell>
                        <TableCell>Server</TableCell>
                        <TableCell>Production</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-100 text-green-700">Secured</Badge>
                        </TableCell>
                        <TableCell>12 hours ago</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Scan Now</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">web-server-02</TableCell>
                        <TableCell>Server</TableCell>
                        <TableCell>Production</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-100 text-green-700">Secured</Badge>
                        </TableCell>
                        <TableCell>12 hours ago</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Scan Now</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">analytics-db</TableCell>
                        <TableCell>Database</TableCell>
                        <TableCell>Staging</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-100 text-green-700">Secured</Badge>
                        </TableCell>
                        <TableCell>1 day ago</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Scan Now</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="servers" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Server Name</TableHead>
                        <TableHead>IP Address</TableHead>
                        <TableHead>Environment</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Scan</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">web-server-01</TableCell>
                        <TableCell>192.168.1.101</TableCell>
                        <TableCell>Production</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-100 text-green-700">Secured</Badge>
                        </TableCell>
                        <TableCell>12 hours ago</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Scan Now</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">web-server-02</TableCell>
                        <TableCell>192.168.1.102</TableCell>
                        <TableCell>Production</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-100 text-green-700">Secured</Badge>
                        </TableCell>
                        <TableCell>12 hours ago</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Scan Now</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="databases" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Database Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Environment</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Scan</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">user-database</TableCell>
                        <TableCell>PostgreSQL</TableCell>
                        <TableCell>Production</TableCell>
                        <TableCell>
                          <Badge variant="destructive">Vulnerable</Badge>
                        </TableCell>
                        <TableCell>1 day ago</TableCell>
                        <TableCell>
                          <Button size="sm">Fix Issues</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">analytics-db</TableCell>
                        <TableCell>MongoDB</TableCell>
                        <TableCell>Staging</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-100 text-green-700">Secured</Badge>
                        </TableCell>
                        <TableCell>1 day ago</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Scan Now</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="apis" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>API Name</TableHead>
                        <TableHead>Endpoint</TableHead>
                        <TableHead>Environment</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Scan</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">api-gateway</TableCell>
                        <TableCell>/api/v1</TableCell>
                        <TableCell>Production</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-100 text-green-700">Secured</Badge>
                        </TableCell>
                        <TableCell>2 days ago</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Scan Now</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">auth-service</TableCell>
                        <TableCell>/auth</TableCell>
                        <TableCell>Production</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-amber-100 text-amber-700">Warning</Badge>
                        </TableCell>
                        <TableCell>3 days ago</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Review</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Assets;
