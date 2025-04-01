
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { User } from "@supabase/supabase-js";

interface SidebarUserProfileProps {
  user: User | null;
  userName: string;
  logout: () => Promise<void>;
}

const SidebarUserProfile = ({ user, userName, logout }: SidebarUserProfileProps) => {
  return (
    <div className="p-4 border-t border-gray-800">
      <div className="flex items-center">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="ml-3 flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{userName}</p>
          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="ml-2 text-gray-400 hover:text-white" 
          onClick={logout}
          title="Logout"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default SidebarUserProfile;
