
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type Vulnerability = Database['public']['Tables']['vulnerabilities']['Row'];

const MetricsCards = () => {
  const [stats, setStats] = useState({
    total: 0,
    critical: 0,
    fixed: 0,
    securityScore: 0,
    totalChange: 0,
    criticalChange: 0,
    fixedChange: 0,
    scoreChange: 0
  });
  const [loading, setLoading] = useState(true);

  const calculateSecurityScore = (total: number, critical: number, fixed: number) => {
    if (total === 0) return 100; // Perfect score if no vulnerabilities
    
    // Calculate a score based on the ratio of fixed vulnerabilities and critical issues
    const fixedRatio = total > 0 ? (fixed / total) * 100 : 0;
    const criticalImpact = total > 0 ? (critical / total) * 30 : 0; // Critical issues reduce score
    
    return Math.round(Math.min(100, Math.max(0, 70 + fixedRatio - criticalImpact)));
  };

  const fetchVulnerabilityStats = async () => {
    try {
      setLoading(true);
      
      // Get current vulnerabilities
      const { data: current, error: currentError } = await supabase
        .from('vulnerabilities')
        .select('*');
      
      if (currentError) throw currentError;
      
      // Calculate current metrics
      const currentTotal = current?.length || 0;
      const currentCritical = current?.filter(v => v.severity === 'critical')?.length || 0;
      const currentFixed = current?.filter(v => v.status === 'fixed')?.length || 0;
      
      // Calculate security score
      const score = calculateSecurityScore(currentTotal, currentCritical, currentFixed);
      
      // For month-over-month changes, in a real app we would fetch historical data
      // For now, let's use mock change percentages - in a production app
      // you would calculate these based on actual historical data
      const mockChanges = {
        totalChange: 2.5,
        criticalChange: -14,
        fixedChange: 42,
        scoreChange: 5
      };
      
      setStats({
        total: currentTotal,
        critical: currentCritical,
        fixed: currentFixed,
        securityScore: score,
        ...mockChanges
      });
    } catch (error) {
      console.error("Error fetching vulnerability stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchVulnerabilityStats();
    
    // Set up real-time subscription for vulnerability changes
    const channel = supabase
      .channel('metrics-changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'vulnerabilities' 
        }, 
        () => {
          // When any change occurs, refresh the stats
          fetchVulnerabilityStats();
        }
      )
      .subscribe();
    
    // Clean up subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Vulnerabilities</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-8 w-16 animate-pulse bg-muted rounded"></div>
          ) : (
            <>
              <div className="text-3xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground mt-1">{stats.totalChange >= 0 ? '+' : ''}{stats.totalChange}% from last month</p>
              <Progress value={stats.total} max={100} className="h-1 mt-3" />
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Critical Issues</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-8 w-16 animate-pulse bg-muted rounded"></div>
          ) : (
            <>
              <div className="text-3xl font-bold text-red-500">{stats.critical}</div>
              <p className="text-xs text-muted-foreground mt-1">{stats.criticalChange >= 0 ? '+' : ''}{stats.criticalChange}% from last month</p>
              <Progress value={stats.critical} max={100} className="h-1 mt-3 bg-red-100" />
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Fixed Issues</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-8 w-16 animate-pulse bg-muted rounded"></div>
          ) : (
            <>
              <div className="text-3xl font-bold text-green-500">{stats.fixed}</div>
              <p className="text-xs text-muted-foreground mt-1">{stats.fixedChange >= 0 ? '+' : ''}{stats.fixedChange}% from last month</p>
              <Progress value={stats.fixed} max={100} className="h-1 mt-3 bg-green-100" />
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Security Score</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-8 w-16 animate-pulse bg-muted rounded"></div>
          ) : (
            <>
              <div className="text-3xl font-bold">{stats.securityScore}<span className="text-lg font-normal">/100</span></div>
              <p className="text-xs text-muted-foreground mt-1">{stats.scoreChange >= 0 ? '+' : ''}{stats.scoreChange} points from last month</p>
              <Progress value={stats.securityScore} max={100} className="h-1 mt-3" />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsCards;
