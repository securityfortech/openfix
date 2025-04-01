
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TeamMembers } from "./TeamMembers";

export const Teams = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  return (
    <Card>
      <CardContent className="p-6">
        <TeamMembers refreshTrigger={refreshTrigger} />
      </CardContent>
    </Card>
  );
};
