
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { VulnerabilityStats } from "@/components/vulnerabilities/VulnerabilityStats";
import { VulnerabilityTabs } from "@/components/vulnerabilities/VulnerabilityTabs";
import { useVulnerabilityStats } from "@/hooks/useVulnerabilityStats";
import { useVulnerabilities } from "@/hooks/useVulnerabilities";

const Vulnerabilities = () => {
  const { user } = useAuth();
  const { stats } = useVulnerabilityStats();
  const { 
    vulnerabilities, 
    loading, 
    handleScanNow,
    getFilteredVulnerabilities,
    formatTimeAgo
  } = useVulnerabilities();
  
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
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Vulnerabilities</h2>
              <p className="text-muted-foreground">Monitor and manage security vulnerabilities</p>
            </div>
            <Button asChild>
              <Link to="/add-vulnerability">
                <Plus className="h-4 w-4 mr-1" /> Add Vulnerability
              </Link>
            </Button>
          </div>
          
          <VulnerabilityStats stats={stats} />
          
          <VulnerabilityTabs
            vulnerabilities={vulnerabilities}
            loading={loading}
            getFilteredVulnerabilities={getFilteredVulnerabilities}
            formatTimeAgo={formatTimeAgo}
            handleScanNow={handleScanNow}
          />
        </main>
      </div>
    </div>
  );
};

export default Vulnerabilities;
