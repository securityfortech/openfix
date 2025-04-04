
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { Teams as TeamsComponent } from "@/components/teams/Teams";

const Teams = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 md:ml-64">
        <Header />
        <main className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Teams</h2>
            <p className="text-muted-foreground text-sm">Manage contributors who can be assigned to vulnerabilities</p>
          </div>
          
          <div className="bg-card rounded-lg border shadow-sm">
            <TeamsComponent />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Teams;
