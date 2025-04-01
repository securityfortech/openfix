import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useOrganization } from "@/contexts/OrganizationContext";

type Vulnerability = {
  id: string;
  name: string;
  location: string;
  description: string | null;
  severity: string;
  status: string;
  detected: string;
  user_id: string | null;
  asset_id: string | null;
  organization_id: string | null;
  created_at: string;
  updated_at: string;
};

export function useVulnerabilities() {
  const { currentOrganization } = useOrganization();
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch vulnerabilities from the database
  const fetchVulnerabilities = async () => {
    if (!currentOrganization) {
      setVulnerabilities([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('vulnerabilities')
        .select('*')
        .eq('organization_id', currentOrganization.id)
        .order('detected', { ascending: false });

      if (error) throw error;

      if (data) {
        setVulnerabilities(data);
      }
    } catch (error) {
      console.error('Error fetching vulnerabilities:', error);
      toast({
        title: "Error",
        description: "Failed to load vulnerabilities. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle scanning for new vulnerabilities
  const handleScanNow = async () => {
    if (!currentOrganization) {
      toast({
        title: "Error",
        description: "No organization selected",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Scan Initiated",
      description: "Security scan has been started. Results will appear shortly.",
    });
    
    try {
      // In a real app, you might trigger an actual scan here
      // For this demo, we'll just refresh the data after a short delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      await fetchVulnerabilities();
      
      toast({
        title: "Scan Complete",
        description: "Vulnerability scan has completed successfully.",
      });
    } catch (error) {
      console.error('Error during scan:', error);
      toast({
        title: "Error",
        description: "Failed to complete vulnerability scan. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Filter vulnerabilities based on severity
  const getFilteredVulnerabilities = (severity: string) => {
    if (severity === 'all') return vulnerabilities;
    return vulnerabilities.filter(vuln => vuln.severity.toLowerCase() === severity.toLowerCase());
  };

  // Format the detection time for display
  const formatTimeAgo = (dateString: string | null) => {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHrs / 24);

    if (diffHrs < 1) return 'Just now';
    if (diffHrs < 24) return `${diffHrs} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    }
    return date.toLocaleDateString();
  };

  // Set up realtime subscription
  useEffect(() => {
    fetchVulnerabilities();

    // Only subscribe to realtime changes if we have an organization
    if (currentOrganization) {
      const channel = supabase
        .channel('vulnerabilities-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'vulnerabilities',
            filter: `organization_id=eq.${currentOrganization.id}`
          },
          (payload) => {
            console.log('Real-time update received:', payload);
            fetchVulnerabilities();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [currentOrganization]);

  return {
    vulnerabilities,
    loading,
    handleScanNow,
    getFilteredVulnerabilities,
    formatTimeAgo
  };
}
