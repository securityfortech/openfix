
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { useOrganization } from "@/contexts/OrganizationContext";

export function useVulnerabilities() {
  const { currentOrganization } = useOrganization();
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVulnerabilities = useCallback(async () => {
    if (!currentOrganization) {
      setVulnerabilities([]);
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('vulnerabilities')
        .select(`
          *,
          assets (*),
          team_members (*)
        `)
        .eq('organization_id', currentOrganization.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setVulnerabilities(data || []);
    } catch (error) {
      console.error('Error fetching vulnerabilities:', error);
      toast({
        title: "Error loading vulnerabilities",
        description: "Failed to load vulnerabilities",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [currentOrganization]);

  useEffect(() => {
    fetchVulnerabilities();
  }, [fetchVulnerabilities]);

  const getFilteredVulnerabilities = (status) => {
    if (status === 'all') {
      return vulnerabilities;
    }
    
    return vulnerabilities.filter((vulnerability) => vulnerability.status === status);
  };

  const formatTimeAgo = (timestamp) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      return 'Unknown time';
    }
  };

  // Expose refetch function to allow manual refresh
  const refetchVulnerabilities = () => {
    fetchVulnerabilities();
  };

  return { 
    vulnerabilities, 
    loading, 
    getFilteredVulnerabilities,
    formatTimeAgo,
    refetchVulnerabilities
  };
}
