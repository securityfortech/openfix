
import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserSettings } from "@/components/settings/UserSettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { SecuritySettings } from "@/components/settings/SecuritySettings";

const Settings = () => {
  const { user } = useAuth();
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="md:pl-64">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Account Settings</h1>
            <p className="text-muted-foreground mt-2 text-base leading-relaxed">Manage your account settings and preferences</p>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
            <Tabs defaultValue="user" className="w-full">
              <TabsList className="mb-8 bg-gray-100/80 p-1.5">
                <TabsTrigger value="user" className="text-sm font-medium px-4">User Profile</TabsTrigger>
                <TabsTrigger value="notifications" className="text-sm font-medium px-4">Notifications</TabsTrigger>
                <TabsTrigger value="security" className="text-sm font-medium px-4">Security</TabsTrigger>
              </TabsList>
              
              <TabsContent value="user">
                <UserSettings userName={userName} email={user?.email || ''} />
              </TabsContent>
              
              <TabsContent value="notifications">
                <NotificationSettings />
              </TabsContent>
              
              <TabsContent value="security">
                <SecuritySettings />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
