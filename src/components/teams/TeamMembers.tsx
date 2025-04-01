import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trash2, UserPlus } from "lucide-react";
import { EmptyState } from "@/components/teams/EmptyState";
import { AddTeamMemberDialog } from "./AddTeamMemberDialog";
import { useOrganization } from "@/contexts/OrganizationContext";
import { TeamMember } from "@/types/team-member";

interface TeamMembersProps {
  refreshTrigger: number;
}

export const TeamMembers: React.FC<TeamMembersProps> = ({ refreshTrigger }) => {
  const { currentOrganization } = useOrganization();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  
  const fetchMembers = async () => {
    if (!currentOrganization) {
      setMembers([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('organization_id', currentOrganization.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setMembers(data || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
      toast({
        title: "Error",
        description: "Failed to load team members",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteMember = async (id: string) => {
    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setMembers(members.filter(member => member.id !== id));
      toast({
        title: "Success",
        description: "Team member removed successfully",
      });
    } catch (error) {
      console.error('Error deleting team member:', error);
      toast({
        title: "Error",
        description: "Failed to remove team member",
        variant: "destructive",
      });
    }
  };
  
  useEffect(() => {
    fetchMembers();
    
    if (currentOrganization) {
      const channel = supabase
        .channel('team_members_changes')
        .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'team_members',
            filter: `organization_id=eq.${currentOrganization.id}`
          }, 
          payload => {
            console.log('Real-time update received:', payload);
            fetchMembers();
          }
        )
        .subscribe();
      
      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [refreshTrigger, currentOrganization]);
  
  const hasNoOrganization = !currentOrganization;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">
          {currentOrganization ? `${currentOrganization.name} Contributors` : 'Contributors'}
        </h3>
        <Button onClick={() => setShowAddDialog(true)} disabled={hasNoOrganization}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </div>
      
      {hasNoOrganization ? (
        <div className="text-center py-8 text-muted-foreground">
          Please select or create an organization to manage team members.
        </div>
      ) : loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : members.length === 0 ? (
        <EmptyState onAddClick={() => setShowAddDialog(true)} />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map(member => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar_url || ''} alt={member.name} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <span>{member.name}</span>
                  </div>
                </TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>
                  <span className="capitalize">{member.role}</span>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDeleteMember(member.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      
      <AddTeamMemberDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
        onMemberAdded={fetchMembers}
      />
    </div>
  );
};
