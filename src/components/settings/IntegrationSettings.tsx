
import React from "react";
import { ImportTeamMembers } from "@/components/teams/ImportTeamMembers";
import { useAuth } from "@/contexts/AuthContext";
import { SettingsSectionHeader } from "./SettingsSectionHeader";

export function IntegrationSettings() {
  const { user } = useAuth();
  
  const handleMembersImported = () => {
    // This will be handled within the ImportTeamMembers component
  };

  return (
    <div className="space-y-8">
      <SettingsSectionHeader 
        title="Integrations" 
        description="Connect with external services to import data" 
      />
      
      <div className="space-y-6">
        <div className="border rounded-lg p-6">
          <h4 className="text-lg font-medium mb-4">Team Members</h4>
          <ImportTeamMembers onImportSuccess={handleMembersImported} />
        </div>
      </div>
    </div>
  );
}
