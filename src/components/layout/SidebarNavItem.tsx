
import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarNavItemProps {
  path: string;
  icon: LucideIcon;
  label: string;
  badge?: number | null;
  isActive: boolean;
}

const SidebarNavItem = ({ path, icon: Icon, label, badge, isActive }: SidebarNavItemProps) => {
  return (
    <Link 
      to={path}
      className={cn(
        "flex items-center h-10 px-4 py-2 my-1 mx-2 text-sm rounded-md transition-colors",
        isActive 
          ? "bg-accent text-accent-foreground font-medium" 
          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
      )}
    >
      <Icon className="h-4 w-4 mr-3 shrink-0" />
      <span>{label}</span>
      {badge !== undefined && (
        <Badge variant="secondary" className="ml-auto h-5 min-w-5 px-1.5 rounded-full">
          {badge !== null ? badge : '...'}
        </Badge>
      )}
    </Link>
  );
};

export default SidebarNavItem;
