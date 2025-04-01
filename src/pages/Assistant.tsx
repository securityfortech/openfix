
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

const Assistant = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        <Header />
        <main className="p-6 space-y-8 max-w-7xl mx-auto">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Security Assistant</h2>
            <p className="text-muted-foreground mt-1">Get intelligent security recommendations for your assets</p>
          </div>
          
          <div className="bg-card rounded-xl border shadow-sm p-6">
            {/* Assistant content will go here */}
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 8V4H8"></path>
                  <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                  <path d="M2 14h2"></path>
                  <path d="M20 14h2"></path>
                  <path d="M15 13v2"></path>
                  <path d="M9 13v2"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Security Assistant</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-4">
                Our intelligent assistant is ready to help you identify and resolve security issues.
              </p>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                Start assistant
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Assistant;
