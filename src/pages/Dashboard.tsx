
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import MetricsCards from "@/components/dashboard/MetricsCards";
import { VulnerabilityList } from "@/components/dashboard/VulnerabilityList";

const Dashboard = () => {
  const { user } = useAuth();
  
  // Get user's name from metadata or use email as fallback
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 md:ml-64">
        <Header />
        <main className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
          <WelcomeSection userName={userName} />
          <MetricsCards />
          <VulnerabilityList />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
