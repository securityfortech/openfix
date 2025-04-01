
import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

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
      className={`flex items-center px-4 py-2 mt-1 text-gray-300 ${
        isActive ? "bg-gray-800 text-white" : "hover:bg-gray-800"
      }`}
    >
      <Icon className="h-5 w-5 mr-3" />
      {label}
      {badge !== undefined && (
        <Badge variant="outline" className="ml-auto bg-gray-800 text-gray-300">
          {badge !== null ? badge : '...'}
        </Badge>
      )}
    </Link>
  );
};

export default SidebarNavItem;
