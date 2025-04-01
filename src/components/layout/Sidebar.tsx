
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Settings, Shield, Home, Database, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Sidebar = () => {
  const { user, logout } = useAuth();
  
  // Get user's name from metadata or use email as fallback
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  
  return (
    <div className="hidden md:flex w-64 flex-col fixed inset-y-0 bg-gray-900 text-white">
      <div className="flex items-center h-16 px-4 border-b border-gray-800">
        <div className="h-8 w-8 rounded-md bg-primary mr-2 flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-xl">O</span>
        </div>
        <h1 className="text-xl font-bold">OpenFix</h1>
      </div>
      <nav className="flex-1 pt-4 pb-4 overflow-y-auto">
        <div className="px-4 mb-2 text-sm font-medium text-gray-400">Main</div>
        <a href="#" className="flex items-center px-4 py-2 text-white bg-gray-800">
          <Home className="h-5 w-5 mr-3" />
          Dashboard
        </a>
        <a href="#" className="flex items-center px-4 py-2 mt-1 text-gray-300 hover:bg-gray-800">
          <Shield className="h-5 w-5 mr-3" />
          Vulnerabilities
          <Badge variant="outline" className="ml-auto bg-gray-800 text-gray-300">
            12
          </Badge>
        </a>
        <a href="#" className="flex items-center px-4 py-2 mt-1 text-gray-300 hover:bg-gray-800">
          <Database className="h-5 w-5 mr-3" />
          Assets
        </a>
        <a href="#" className="flex items-center px-4 py-2 mt-1 text-gray-300 hover:bg-gray-800">
          <Bot className="h-5 w-5 mr-3" />
          Assistant
        </a>
        
        <div className="px-4 mt-6 mb-2 text-sm font-medium text-gray-400">Settings</div>
        <a href="#" className="flex items-center px-4 py-2 mt-1 text-gray-300 hover:bg-gray-800">
          <Settings className="h-5 w-5 mr-3" />
          Settings
        </a>
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
