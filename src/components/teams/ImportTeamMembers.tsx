
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, GitlabIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ImportTeamMembersProps {
  onImportSuccess: () => void;
}

export const ImportTeamMembers: React.FC<ImportTeamMembersProps> = ({ onImportSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [githubUsername, setGithubUsername] = useState("");
  const [gitlabUsername, setGitlabUsername] = useState("");
  
  // Mock function to simulate GitHub import
  const importFromGitHub = async () => {
    setLoading(true);
    try {
      // Simulating API call to GitHub
      console.log("Importing from GitHub:", githubUsername);
      
      // Mock data for demonstration
      const mockMembers = [
        {
          name: "John Smith",
          email: "john@example.com",
          avatar_url: null,
          role: "contributor"
        },
        {
          name: "Samantha Jones",
          email: "samantha@example.com",
          avatar_url: null,
          role: "contributor"
        }
      ];
      
      // Insert the mock members into the database
      for (const member of mockMembers) {
        const { error } = await supabase
          .from('team_members')
          .insert([member]);
        
        if (error) throw error;
      }
      
      toast({
        title: "Success",
        description: `Imported ${mockMembers.length} team members from GitHub`,
      });
      
      onImportSuccess();
    } catch (error) {
      console.error('Error importing from GitHub:', error);
      toast({
        title: "Error",
        description: "Failed to import team members from GitHub",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setGithubUsername("");
    }
  };
  
  // Mock function to simulate GitLab import
  const importFromGitLab = async () => {
    setLoading(true);
    try {
      // Simulating API call to GitLab
      console.log("Importing from GitLab:", gitlabUsername);
      
      // Mock data for demonstration
      const mockMembers = [
        {
          name: "Alex Rodriguez",
          email: "alex@example.com",
          avatar_url: null,
          role: "reviewer"
        },
        {
          name: "Priya Patel",
          email: "priya@example.com",
          avatar_url: null,
          role: "contributor"
        }
      ];
      
      // Insert the mock members into the database
      for (const member of mockMembers) {
        const { error } = await supabase
          .from('team_members')
          .insert([member]);
        
        if (error) throw error;
      }
      
      toast({
        title: "Success",
        description: `Imported ${mockMembers.length} team members from GitLab`,
      });
      
      onImportSuccess();
    } catch (error) {
      console.error('Error importing from GitLab:', error);
      toast({
        title: "Error",
        description: "Failed to import team members from GitLab",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setGitlabUsername("");
    }
  };
  
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Import Team Members</h3>
      <p className="text-muted-foreground mb-6">
        Import contributors from GitHub or GitLab to assign them to vulnerabilities.
      </p>
      
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
          <Card>
            <CardHeader>
              <CardTitle>Import from GitHub</CardTitle>
              <CardDescription>
                Enter your GitHub organization or username to import team members.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="github-username" className="text-sm font-medium">
                    Organization or Username
                  </label>
                  <input
                    id="github-username"
                    placeholder="e.g., microsoft"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    value={githubUsername}
                    onChange={(e) => setGithubUsername(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={importFromGitHub}
                disabled={loading || !githubUsername}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Importing...
                  </>
                ) : (
                  <>Import from GitHub</>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="gitlab" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Import from GitLab</CardTitle>
              <CardDescription>
                Enter your GitLab group or username to import team members.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="gitlab-username" className="text-sm font-medium">
                    Group or Username
                  </label>
                  <input
                    id="gitlab-username"
                    placeholder="e.g., gitlab-org"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    value={gitlabUsername}
                    onChange={(e) => setGitlabUsername(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={importFromGitLab}
                disabled={loading || !gitlabUsername}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Importing...
                  </>
                ) : (
                  <>Import from GitLab</>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
