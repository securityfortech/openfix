
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

type Organization = {
  id: string;
  name: string;
  created_at: string;
};

type OrganizationContextType = {
  currentOrganization: Organization | null;
  organizations: Organization[];
  isLoading: boolean;
  switchOrganization: (orgId: string) => Promise<void>;
  createOrganization: (name: string) => Promise<void>;
};

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export function OrganizationProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserOrganizations();
    } else {
      setOrganizations([]);
      setCurrentOrganization(null);
      setIsLoading(false);
    }
  }, [user]);

  const fetchUserOrganizations = async () => {
    setIsLoading(true);
    try {
      // Get organizations that the user is a member of
      const { data: memberData, error: memberError } = await supabase
        .from('organization_members')
        .select('organization_id')
        .eq('user_id', user?.id);

      if (memberError) throw memberError;

      if (memberData && memberData.length > 0) {
        const orgIds = memberData.map(item => item.organization_id);
        
        const { data: orgsData, error: orgsError } = await supabase
          .from('organizations')
          .select('*')
          .in('id', orgIds);

        if (orgsError) throw orgsError;

        if (orgsData && orgsData.length > 0) {
          setOrganizations(orgsData);
          
          // Set current organization to the first one if not already set
          if (!currentOrganization) {
            setCurrentOrganization(orgsData[0]);
          }
        }
      } else {
        // User has no organizations yet, try to get the default one
        const { data: defaultOrg, error: defaultOrgError } = await supabase
          .from('organizations')
          .select('*')
          .eq('name', 'Default Organization')
          .single();

        if (!defaultOrgError && defaultOrg) {
          // Add user to the default organization
          const { error: joinError } = await supabase
            .from('organization_members')
            .insert({
              organization_id: defaultOrg.id,
              user_id: user?.id,
              role: 'member'
            });

          if (!joinError) {
            setOrganizations([defaultOrg]);
            setCurrentOrganization(defaultOrg);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching organizations:', error);
      toast({
        title: "Error",
        description: "Failed to load organizations",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const switchOrganization = async (orgId: string) => {
    const organization = organizations.find(org => org.id === orgId);
    if (organization) {
      setCurrentOrganization(organization);
      // You might want to save this preference in localStorage or user preferences
    }
  };

  const createOrganization = async (name: string) => {
    if (!user) return;
    
    try {
      // Create new organization
      const { data: newOrg, error: createError } = await supabase
        .from('organizations')
        .insert({ name })
        .select()
        .single();

      if (createError) throw createError;
      
      // Add current user as admin to the organization
      const { error: memberError } = await supabase
        .from('organization_members')
        .insert({
          organization_id: newOrg.id,
          user_id: user.id,
          role: 'admin'
        });

      if (memberError) throw memberError;
      
      // Refresh organizations
      fetchUserOrganizations();
      
      toast({
        title: "Success",
        description: `Organization "${name}" created successfully`,
      });
    } catch (error) {
      console.error('Error creating organization:', error);
      toast({
        title: "Error",
        description: "Failed to create organization",
        variant: "destructive",
      });
    }
  };

  return (
    <OrganizationContext.Provider
      value={{
        currentOrganization,
        organizations,
        isLoading,
        switchOrganization,
        createOrganization
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
}

export const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error('useOrganization must be used within an OrganizationProvider');
  }
  return context;
};
