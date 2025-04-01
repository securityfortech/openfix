
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ImportFormProps {
  serviceName: string;
  serviceIcon: React.ReactNode;
  usernameLabel: string;
  usernamePlaceholder: string;
  onImportSuccess: () => void;
}

export const ImportForm: React.FC<ImportFormProps> = ({
  serviceName,
  serviceIcon,
  usernameLabel,
  usernamePlaceholder,
  onImportSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  
  const handleImport = async () => {
    if (!username.trim()) return;
    
    setLoading(true);
    try {
      // Simulating API call to service
      console.log(`Importing from ${serviceName}:`, username);
      
      // Mock data for demonstration
      const mockMembers = [
        {
          name: serviceName === "GitHub" ? "John Smith" : "Alex Rodriguez",
          email: serviceName === "GitHub" ? "john@example.com" : "alex@example.com",
          avatar_url: null,
          role: serviceName === "GitHub" ? "contributor" : "reviewer"
        },
        {
          name: serviceName === "GitHub" ? "Samantha Jones" : "Priya Patel",
          email: serviceName === "GitHub" ? "samantha@example.com" : "priya@example.com",
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
        description: `Imported ${mockMembers.length} team members from ${serviceName}`,
      });
      
      onImportSuccess();
    } catch (error) {
      console.error(`Error importing from ${serviceName}:`, error);
      toast({
        title: "Error",
        description: `Failed to import team members from ${serviceName}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setUsername("");
    }
  };
  
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <label htmlFor={`${serviceName.toLowerCase()}-username`} className="text-sm font-medium">
          {usernameLabel}
        </label>
        <input
          id={`${serviceName.toLowerCase()}-username`}
          placeholder={usernamePlaceholder}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <Button 
        className="w-full" 
        onClick={handleImport}
        disabled={loading || !username}
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Importing...
          </>
        ) : (
          <>Import from {serviceName}</>
        )}
      </Button>
    </div>
  );
};
