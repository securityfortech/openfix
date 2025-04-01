
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Database, Shield } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddAssetForm } from "@/components/assets/AddAssetForm";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Define the Asset type based on our database structure
type Asset = {
  id: string;
  name: string;
  type: string;
  environment: string;
  status: string;
  last_scan: string;
  ip_address: string | null;
  endpoint: string | null;
};

const Assets = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    vulnerable: 0,
    secured: 0
  });

  // Fetch assets from the database
  const fetchAssets = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('assets')
        .select('*');

      if (error) throw error;

      if (data) {
        setAssets(data);
        
        // Calculate stats
        const totalCount = data.length;
        const vulnerableCount = data.filter(asset => asset.status === 'vulnerable').length;
        const securedCount = data.filter(asset => asset.status === 'secured').length;
        
        setStats({
          total: totalCount,
          vulnerable: vulnerableCount,
          secured: securedCount
        });
      }
    } catch (error) {
      console.error('Error fetching assets:', error);
      toast({
        title: "Error",
        description: "Failed to load assets. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle scanning an asset
  const handleScanAsset = async (id: string) => {
    toast({
      title: "Scanning Asset",
      description: "Initiating security scan...",
    });
    
    // In a real application, you'd initiate an actual scan here
    // For demo purposes, we'll just update the last_scan time
    try {
      const { error } = await supabase
        .from('assets')
        .update({ last_scan: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      
      fetchAssets(); // Refresh the assets list
      
      toast({
        title: "Scan Complete",
        description: "Asset has been scanned successfully.",
      });
    } catch (error) {
      console.error('Error scanning asset:', error);
      toast({
        title: "Error",
        description: "Failed to scan asset. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Handle fixing issues
  const handleFixIssues = async (id: string) => {
    toast({
      title: "Fixing Issues",
      description: "Attempting to fix security issues...",
    });
    
    try {
      const { error } = await supabase
        .from('assets')
        .update({ 
          status: 'secured',
          last_scan: new Date().toISOString() 
        })
        .eq('id', id);

      if (error) throw error;
      
      fetchAssets(); // Refresh the assets list
      
      toast({
        title: "Issues Fixed",
        description: "Security issues have been resolved.",
      });
    } catch (error) {
      console.error('Error fixing issues:', error);
      toast({
        title: "Error",
        description: "Failed to fix issues. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Listen for realtime updates
  useEffect(() => {
    fetchAssets();

    // Set up realtime subscription
    const channel = supabase
      .channel('table-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'assets'
        },
        () => {
          fetchAssets();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Filter assets based on the selected tab
  const getFilteredAssets = (type: string) => {
    if (type === 'all') return assets;
    return assets.filter(asset => asset.type.toLowerCase() === type.toLowerCase());
  };

  // Format the last scan date
  const formatLastScan = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHrs / 24);

    if (diffHrs < 1) return 'Just now';
    if (diffHrs < 24) return `${diffHrs} hours ago`;
    return `${diffDays} days ago`;
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        <Header />
        <main className="p-4 md:p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Assets</h2>
              <p className="text-muted-foreground">Manage and monitor your application assets</p>
            </div>
            <AddAssetForm />
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
                <div className="text-3xl font-bold">{stats.total}</div>
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
                <div className="text-3xl font-bold">{stats.vulnerable}</div>
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
                <div className="text-3xl font-bold">{stats.secured}</div>
                <p className="text-muted-foreground text-sm">Assets with no known issues</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Assets</TabsTrigger>
              <TabsTrigger value="server">Servers</TabsTrigger>
              <TabsTrigger value="database">Databases</TabsTrigger>
              <TabsTrigger value="api">APIs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  {loading ? (
                    <div className="py-8 text-center text-muted-foreground">Loading assets...</div>
                  ) : assets.length === 0 ? (
                    <div className="py-8 text-center text-muted-foreground">
                      No assets found. Add your first asset to get started.
                    </div>
                  ) : (
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
                        {assets.map(asset => (
                          <TableRow key={asset.id}>
                            <TableCell className="font-medium">{asset.name}</TableCell>
                            <TableCell>{asset.type}</TableCell>
                            <TableCell>{asset.environment}</TableCell>
                            <TableCell>
                              {asset.status === 'vulnerable' ? (
                                <Badge variant="destructive">Vulnerable</Badge>
                              ) : asset.status === 'warning' ? (
                                <Badge variant="outline" className="bg-amber-100 text-amber-700">Warning</Badge>
                              ) : (
                                <Badge variant="outline" className="bg-green-100 text-green-700">Secured</Badge>
                              )}
                            </TableCell>
                            <TableCell>{formatLastScan(asset.last_scan)}</TableCell>
                            <TableCell>
                              {asset.status === 'vulnerable' ? (
                                <Button size="sm" onClick={() => handleFixIssues(asset.id)}>Fix Issues</Button>
                              ) : asset.status === 'warning' ? (
                                <Button variant="outline" size="sm" onClick={() => handleScanAsset(asset.id)}>Review</Button>
                              ) : (
                                <Button variant="outline" size="sm" onClick={() => handleScanAsset(asset.id)}>Scan Now</Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {['server', 'database', 'api'].map(type => (
              <TabsContent key={type} value={type} className="mt-4">
                <Card>
                  <CardContent className="p-0">
                    {loading ? (
                      <div className="py-8 text-center text-muted-foreground">Loading assets...</div>
                    ) : getFilteredAssets(type).length === 0 ? (
                      <div className="py-8 text-center text-muted-foreground">
                        No {type}s found. Add a {type} to get started.
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>{type === 'server' ? 'Server Name' : type === 'database' ? 'Database Name' : 'API Name'}</TableHead>
                            <TableHead>{type === 'server' ? 'IP Address' : type === 'database' ? 'Type' : 'Endpoint'}</TableHead>
                            <TableHead>Environment</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Last Scan</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {getFilteredAssets(type).map(asset => (
                            <TableRow key={asset.id}>
                              <TableCell className="font-medium">{asset.name}</TableCell>
                              <TableCell>{type === 'server' ? asset.ip_address : type === 'api' ? asset.endpoint : asset.type}</TableCell>
                              <TableCell>{asset.environment}</TableCell>
                              <TableCell>
                                {asset.status === 'vulnerable' ? (
                                  <Badge variant="destructive">Vulnerable</Badge>
                                ) : asset.status === 'warning' ? (
                                  <Badge variant="outline" className="bg-amber-100 text-amber-700">Warning</Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-green-100 text-green-700">Secured</Badge>
                                )}
                              </TableCell>
                              <TableCell>{formatLastScan(asset.last_scan)}</TableCell>
                              <TableCell>
                                {asset.status === 'vulnerable' ? (
                                  <Button size="sm" onClick={() => handleFixIssues(asset.id)}>Fix Issues</Button>
                                ) : asset.status === 'warning' ? (
                                  <Button variant="outline" size="sm" onClick={() => handleScanAsset(asset.id)}>Review</Button>
                                ) : (
                                  <Button variant="outline" size="sm" onClick={() => handleScanAsset(asset.id)}>Scan Now</Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Assets;
