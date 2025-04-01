
import React from "react";

export const ImportTeamMembersHeader: React.FC = () => {
  return (
    <>
      <h3 className="text-lg font-medium mb-4">Import Team Members</h3>
      <p className="text-muted-foreground mb-6">
        Import contributors from GitHub or GitLab to assign them to vulnerabilities.
      </p>
    </>
  );
};
