
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
        <main className="p-4 md:p-6 space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Teams</h2>
            <p className="text-muted-foreground">Manage contributors who can be assigned to vulnerabilities</p>
          </div>
          
          <TeamsComponent />
        </main>
      </div>
    </div>
  );
};

export default Teams;
