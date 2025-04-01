
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { VulnerabilityStats } from "@/components/vulnerabilities/VulnerabilityStats";
import { VulnerabilityTabs } from "@/components/vulnerabilities/VulnerabilityTabs";
import { useVulnerabilityStats } from "@/hooks/useVulnerabilityStats";
import { useVulnerabilities } from "@/hooks/useVulnerabilities";
import AddVulnerabilityForm from "@/components/vulnerabilities/AddVulnerabilityForm";

const Vulnerabilities = () => {
  const { user } = useAuth();
  const { stats } = useVulnerabilityStats();
  const { 
    vulnerabilities, 
    loading, 
    getFilteredVulnerabilities,
    formatTimeAgo,
    refetchVulnerabilities
  } = useVulnerabilities();
  
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        <Header />
        <main className="p-6 space-y-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Vulnerabilities</h2>
              <p className="text-muted-foreground mt-1">Monitor and manage security vulnerabilities</p>
            </div>
            <AddVulnerabilityForm onSuccess={refetchVulnerabilities} />
          </div>
          
          <VulnerabilityStats stats={stats} />
          
          <div className="bg-card rounded-xl border shadow-sm">
            <VulnerabilityTabs
              vulnerabilities={vulnerabilities}
              loading={loading}
              getFilteredVulnerabilities={getFilteredVulnerabilities}
              formatTimeAgo={formatTimeAgo}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Vulnerabilities;
