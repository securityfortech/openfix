
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import SidebarHeader from "./SidebarHeader";
import SidebarNavigation from "./SidebarNavigation";
import SidebarUserProfile from "./SidebarUserProfile";
import { useVulnerabilityCount } from "@/hooks/useVulnerabilityCount";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const vulnerabilityCount = useVulnerabilityCount();
  
  // Get user's name from metadata or use email as fallback
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  
  return (
    <div className="hidden md:flex w-64 flex-col fixed inset-y-0 bg-gray-900 text-white">
      <SidebarHeader />
      <SidebarNavigation vulnerabilityCount={vulnerabilityCount} />
      <SidebarUserProfile user={user} userName={userName} logout={logout} />
    </div>
  );
};

export default Sidebar;
