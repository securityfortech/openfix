
import React from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

interface EmptyStateProps {
  onAddClick?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onAddClick }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-3 mb-4">
        <UserPlus className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium mb-2">No team members yet</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        Add contributors from your organization to assign them to vulnerabilities and track their progress.
      </p>
      {onAddClick && (
        <Button onClick={onAddClick}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
      )}
    </div>
  );
};
