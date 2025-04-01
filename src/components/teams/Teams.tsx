
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { TeamMembers } from "./TeamMembers";
import { ImportTeamMembers } from "./ImportTeamMembers";

export const Teams = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const handleMembersImported = () => {
    // Trigger a refresh of the team members list
    setRefreshTrigger(prev => prev + 1);
  };
  
  return (
    <Tabs defaultValue="members">
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="import">Import Members</TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="members" className="mt-0">
        <Card>
          <CardContent className="p-6">
            <TeamMembers refreshTrigger={refreshTrigger} />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="import" className="mt-0">
        <Card>
          <CardContent className="p-6">
            <ImportTeamMembers onImportSuccess={handleMembersImported} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
