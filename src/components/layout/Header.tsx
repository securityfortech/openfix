
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { user } = useAuth();
  
  // Get user's name from metadata or use email as fallback
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  
  return (
    <header className="bg-background border-b border-border h-16 flex items-center justify-between px-4 md:px-6">
      <h1 className="text-xl font-bold md:hidden">OpenFix</h1>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
        </Button>
        <Avatar className="h-9 w-9 md:hidden">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
