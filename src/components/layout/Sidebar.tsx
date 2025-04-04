
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import SidebarHeader from "./SidebarHeader";
import SidebarNavigation from "./SidebarNavigation";
import SidebarUserProfile from "./SidebarUserProfile";
import { useVulnerabilityCount } from "@/hooks/useVulnerabilityCount";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const vulnerabilityCount = useVulnerabilityCount();
  
  // Get user's name from metadata or use email as fallback
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  
  return (
    <aside className="hidden md:flex md:w-64 h-screen bg-card border-r border-border flex-col fixed inset-y-0 z-30">
      <SidebarHeader />
      <ScrollArea className="flex-1">
        <SidebarNavigation vulnerabilityCount={vulnerabilityCount} />
      </ScrollArea>
      <SidebarUserProfile user={user} userName={userName} logout={logout} />
    </aside>
  );
};

export default Sidebar;
