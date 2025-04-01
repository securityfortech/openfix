
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GitlabIcon } from "lucide-react";
import { ImportForm } from "./ImportForm";

interface GitLabImportProps {
  onImportSuccess: () => void;
}

export const GitLabImport: React.FC<GitLabImportProps> = ({ onImportSuccess }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Import from GitLab</CardTitle>
        <CardDescription>
          Enter your GitLab group or username to import team members.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ImportForm
          serviceName="GitLab"
          serviceIcon={<GitlabIcon className="mr-2 h-4 w-4" />}
          usernameLabel="Group or Username"
          usernamePlaceholder="e.g., gitlab-org"
          onImportSuccess={onImportSuccess}
        />
      </CardContent>
    </Card>
  );
};
