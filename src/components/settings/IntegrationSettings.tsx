
import React from "react";
import { ImportTeamMembers } from "@/components/teams/ImportTeamMembers";
import { useAuth } from "@/contexts/AuthContext";

export function IntegrationSettings() {
  const { user } = useAuth();
  
  const handleMembersImported = () => {
    // This will be handled within the ImportTeamMembers component
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold tracking-tight text-gray-900">Integrations</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Connect with external services to import data
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="border rounded-lg p-6">
          <h4 className="text-lg font-medium mb-4">Team Members</h4>
          <ImportTeamMembers onImportSuccess={handleMembersImported} />
        </div>
      </div>
    </div>
  );
}
