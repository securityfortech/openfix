
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Github } from "lucide-react";
import { ImportForm } from "./ImportForm";

interface GitHubImportProps {
  onImportSuccess: () => void;
}

export const GitHubImport: React.FC<GitHubImportProps> = ({ onImportSuccess }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Import from GitHub</CardTitle>
        <CardDescription>
          Enter your GitHub organization or username to import team members.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ImportForm
          serviceName="GitHub"
          serviceIcon={<Github className="mr-2 h-4 w-4" />}
          usernameLabel="Organization or Username"
          usernamePlaceholder="e.g., microsoft"
          onImportSuccess={onImportSuccess}
        />
      </CardContent>
    </Card>
  );
};
