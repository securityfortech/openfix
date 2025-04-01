
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, GitlabIcon } from "lucide-react";
import { GitHubImport } from "./import/GitHubImport";
import { GitLabImport } from "./import/GitLabImport";
import { ImportTeamMembersHeader } from "./import/ImportTeamMembersHeader";

interface ImportTeamMembersProps {
  onImportSuccess: () => void;
}

export const ImportTeamMembers: React.FC<ImportTeamMembersProps> = ({ onImportSuccess }) => {
  return (
    <div>
      <ImportTeamMembersHeader />
      
      <Tabs defaultValue="github">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="github">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </TabsTrigger>
          <TabsTrigger value="gitlab">
            <GitlabIcon className="mr-2 h-4 w-4" />
            GitLab
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="github" className="mt-6">
          <GitHubImport onImportSuccess={onImportSuccess} />
        </TabsContent>
        
        <TabsContent value="gitlab" className="mt-6">
          <GitLabImport onImportSuccess={onImportSuccess} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
