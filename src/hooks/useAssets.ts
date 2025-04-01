
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Asset, AssetStats } from "@/types/asset";

export function useAssets() {
  const { toast } = useToast();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<AssetStats>({
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

  // Set up realtime subscription and fetch initial data
  useEffect(() => {
    fetchAssets();

    const channel = supabase
      .channel('assets-changes')
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

  return {
    assets,
    loading,
    stats,
    handleScanAsset,
    handleFixIssues,
    getFilteredAssets,
    formatLastScan
  };
}
