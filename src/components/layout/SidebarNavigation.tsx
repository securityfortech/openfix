
import React from "react";
import { useLocation } from "react-router-dom";
import { Shield, Home, Database, Bot, Users, Settings } from "lucide-react";
import SidebarNavItem from "./SidebarNavItem";

interface SidebarNavigationProps {
  vulnerabilityCount: number | null;
}

const SidebarNavigation = ({ vulnerabilityCount }: SidebarNavigationProps) => {
  const location = useLocation();
  
  // Define navigation items
  const mainNavItems = [
    { path: "/dashboard", icon: Home, label: "Dashboard" },
    { path: "/vulnerabilities", icon: Shield, label: "Vulnerabilities", badge: vulnerabilityCount },
    { path: "/assets", icon: Database, label: "Assets" },
    { path: "/teams", icon: Users, label: "Teams" },
    { path: "/assistant", icon: Bot, label: "Assistant" }
  ];
  
  const settingsNavItems = [
    { path: "/settings", icon: Settings, label: "Settings" }
  ];
  
  // Determine if a nav item is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="flex-1 pt-4 pb-4 overflow-y-auto">
      {mainNavItems.map((item) => (
        <SidebarNavItem 
          key={item.path}
          path={item.path}
          icon={item.icon}
          label={item.label}
          badge={item.badge}
          isActive={isActive(item.path)}
        />
      ))}
      
      {settingsNavItems.map((item) => (
        <SidebarNavItem 
          key={item.path}
          path={item.path}
          icon={item.icon}
          label={item.label}
          isActive={isActive(item.path)}
        />
      ))}
    </nav>
  );
};

export default SidebarNavigation;
