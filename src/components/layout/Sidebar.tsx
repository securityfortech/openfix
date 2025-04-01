
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Settings, Shield, Home, Database, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [vulnerabilityCount, setVulnerabilityCount] = useState<number | null>(null);
  
  // Get user's name from metadata or use email as fallback
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  
  // Fetch vulnerability count
  useEffect(() => {
    const fetchVulnerabilityCount = async () => {
      try {
        const { count, error } = await supabase
          .from('vulnerabilities')
          .select('*', { count: 'exact', head: true });
        
        if (error) {
          console.error('Error fetching vulnerability count:', error);
          return;
        }
        
        setVulnerabilityCount(count);
      } catch (error) {
        console.error('Error fetching vulnerability count:', error);
      }
    };

    fetchVulnerabilityCount();

    // Set up realtime subscription for vulnerability changes
    const channel = supabase
      .channel('sidebar-vulnerability-count')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'vulnerabilities' 
        }, 
        () => {
          // When any change occurs, refresh the count
          fetchVulnerabilityCount();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  
  // Define navigation items
  const mainNavItems = [
    { path: "/dashboard", icon: Home, label: "Dashboard" },
    { path: "/vulnerabilities", icon: Shield, label: "Vulnerabilities", badge: vulnerabilityCount },
    { path: "/assets", icon: Database, label: "Assets" },
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
    <div className="hidden md:flex w-64 flex-col fixed inset-y-0 bg-gray-900 text-white">
      <div className="flex items-center h-16 px-4 border-b border-gray-800">
        <div className="h-8 w-8 rounded-md bg-primary mr-2 flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-xl">O</span>
        </div>
        <h1 className="text-xl font-bold">OpenFix</h1>
      </div>
      <nav className="flex-1 pt-4 pb-4 overflow-y-auto">
        {mainNavItems.map((item) => (
          <Link 
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-2 mt-1 text-gray-300 ${
              isActive(item.path) ? "bg-gray-800 text-white" : "hover:bg-gray-800"
            }`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.label}
            {item.badge !== undefined && (
              <Badge variant="outline" className="ml-auto bg-gray-800 text-gray-300">
                {item.badge !== null ? item.badge : '...'}
              </Badge>
            )}
          </Link>
        ))}
        
        {settingsNavItems.map((item) => (
          <Link 
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-2 mt-1 text-gray-300 ${
              isActive(item.path) ? "bg-gray-800 text-white" : "hover:bg-gray-800"
            }`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <p className="text-sm font-medium">{userName}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto" onClick={logout}>
            <LogOut className="h-5 w-5 text-gray-400" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
