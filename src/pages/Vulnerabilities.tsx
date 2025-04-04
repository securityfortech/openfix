
import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { VulnerabilityStats } from "@/components/vulnerabilities/VulnerabilityStats";
import { VulnerabilityTabs } from "@/components/vulnerabilities/VulnerabilityTabs";
import { useVulnerabilityStats } from "@/hooks/useVulnerabilityStats";
import { useVulnerabilities } from "@/hooks/useVulnerabilities";
import AddVulnerabilityForm from "@/components/vulnerabilities/AddVulnerabilityForm";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const Vulnerabilities = () => {
  const { user } = useAuth();
  const { stats } = useVulnerabilityStats();
  const { 
    vulnerabilities, 
    loading, 
    error,
    getFilteredVulnerabilities,
    formatTimeAgo,
    refetchVulnerabilities
  } = useVulnerabilities();
  
  useEffect(() => {
    console.log("Vulnerabilities page rendering with", vulnerabilities.length, "vulnerabilities, loading:", loading, "error:", error);
  }, [vulnerabilities, loading, error]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Please log in</h2>
          <p className="text-muted-foreground mt-2">You need to be logged in to view this page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 md:ml-64">
        <Header />
        <main className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Vulnerabilities</h2>
              <p className="text-muted-foreground text-sm">Monitor and manage security vulnerabilities</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => refetchVulnerabilities()}
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                <span className="sr-only">Refresh</span>
              </Button>
              <AddVulnerabilityForm onSuccess={refetchVulnerabilities} />
            </div>
          </div>
          
          <VulnerabilityStats stats={stats} />
          
          <div className="bg-card rounded-lg border shadow-sm">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center py-12 text-center">
                <div>
                  <h3 className="text-lg font-medium text-destructive mb-2">Error loading vulnerabilities</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto text-sm">{error}</p>
                  <Button 
                    variant="outline" 
                    onClick={refetchVulnerabilities} 
                    className="mt-4"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            ) : (
              <VulnerabilityTabs
                vulnerabilities={vulnerabilities}
                loading={loading}
                getFilteredVulnerabilities={getFilteredVulnerabilities}
                formatTimeAgo={formatTimeAgo}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Vulnerabilities;
