
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";

export function useVulnerabilities() {
  const { user } = useAuth();
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVulnerabilities = useCallback(async () => {
    try {
      if (!user) {
        console.log("No user found, skipping vulnerability fetch");
        setVulnerabilities([]);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      console.log("Fetching vulnerabilities for user:", user.id);
      
      const { data, error } = await supabase
        .from('vulnerabilities')
        .select(`
          id, name, description, severity, status, location, created_at, updated_at, detected,
          assets:asset_id (id, name, type, environment, status, last_scan, ip_address, endpoint),
          team_members:assignee_id (id, name, email, avatar_url, role)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }
      
      console.log("Vulnerabilities fetched:", data ? data.length : 0, "items");
      setVulnerabilities(data || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching vulnerabilities:', error);
      setError(error.message);
      toast({
        title: "Error loading vulnerabilities",
        description: "Failed to load vulnerabilities: " + error.message,
        variant: "destructive",
      });
      setVulnerabilities([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    console.log("useVulnerabilities hook initialized");
    fetchVulnerabilities();
  }, [fetchVulnerabilities]);

  // Filter by severity instead of status
  const getFilteredVulnerabilities = (filter) => {
    if (filter === 'all') {
      return vulnerabilities;
    }
    
    return vulnerabilities.filter((vulnerability) => 
      vulnerability.severity.toLowerCase() === filter.toLowerCase()
    );
  };

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'Unknown time';
    
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      console.error('Error formatting time:', error);
      return 'Unknown time';
    }
  };

  // Expose refetch function to allow manual refresh
  const refetchVulnerabilities = () => {
    console.log("Manually refetching vulnerabilities");
    fetchVulnerabilities();
  };

  return { 
    vulnerabilities, 
    loading, 
    error,
    getFilteredVulnerabilities,
    formatTimeAgo,
    refetchVulnerabilities
  };
}
