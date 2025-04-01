
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { Teams as TeamsComponent } from "@/components/teams/Teams";

const Teams = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        <Header />
        <main className="p-6 space-y-8 max-w-7xl mx-auto">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Teams</h2>
            <p className="text-muted-foreground mt-1">Manage contributors who can be assigned to vulnerabilities</p>
          </div>
          
          <div className="bg-card rounded-xl border shadow-sm">
            <TeamsComponent />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Teams;
