
import React from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TeamMember } from "@/types/team-member";

interface TeamMemberSelectFieldProps {
  form: UseFormReturn<any>;
  teamMembers: TeamMember[];
  isLoading: boolean;
}

const TeamMemberSelectField: React.FC<TeamMemberSelectFieldProps> = ({
  form,
  teamMembers,
  isLoading,
}) => {
  return (
    <FormField
      control={form.control}
      name="assignee_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Assigned to</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value}
            disabled={isLoading}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select team member" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="none">Unassigned</SelectItem>
              {teamMembers.map((member) => (
                <SelectItem key={member.id} value={member.id}>
                  {member.name} ({member.role})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TeamMemberSelectField;
