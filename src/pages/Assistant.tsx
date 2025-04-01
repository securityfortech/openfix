
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Shield } from "lucide-react";

const Assistant = () => {
  const { user } = useAuth();
  const [userQuery, setUserQuery] = useState("");
  const [conversation, setConversation] = useState([
    { 
      role: "assistant",
      content: "Hi there! I'm your security assistant. How can I help you today?",
    }
  ]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;
    
    // Add user message to conversation
    setConversation(prev => [
      ...prev, 
      { role: "user", content: userQuery }
    ]);
    
    // Simulate a response (in a real app, this would call an API)
    setTimeout(() => {
      let response = "";
      
      if (userQuery.toLowerCase().includes("vulnerabilit")) {
        response = "Based on our latest scan, I found 3 critical vulnerabilities that need your attention. Would you like me to provide details about them?";
      } else if (userQuery.toLowerCase().includes("password") || userQuery.toLowerCase().includes("credential")) {
        response = "I recommend implementing a strong password policy requiring minimum 12 characters with a mix of uppercase, lowercase, numbers, and special characters. Would you like me to suggest specific password policy settings?";
      } else if (userQuery.toLowerCase().includes("scan") || userQuery.toLowerCase().includes("check")) {
        response = "I can start a new security scan for your assets. Which environment would you like me to scan - production, staging, or development?";
      } else {
        response = "I'm here to help with security-related questions and tasks. You can ask me about vulnerabilities, security best practices, or to run security scans on your assets.";
      }
      
      setConversation(prev => [
        ...prev, 
        { role: "assistant", content: response }
      ]);
    }, 1000);
    
    // Clear input
    setUserQuery("");
  };
  
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        <Header />
        <main className="p-4 md:p-6 space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Security Assistant</h2>
            <p className="text-muted-foreground">Get help with security concerns and automated recommendations</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Chat with Security Assistant</CardTitle>
                <CardDescription>Ask questions about security issues or request guidance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 h-[400px] overflow-y-auto flex flex-col space-y-4">
                  {conversation.map((message, index) => (
                    <div 
                      key={index} 
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div 
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.role === "user" 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted"
                        }`}
                      >
                        {message.role === "assistant" && (
                          <div className="flex items-center mb-1">
                            <Bot className="h-4 w-4 mr-1" />
                            <span className="text-xs font-medium">Assistant</span>
                          </div>
                        )}
                        <p>{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    placeholder="Ask a security question..."
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <Button type="submit">Send</Button>
                </form>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Quick Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">Run Security Scan</Button>
                  <Button variant="outline" className="w-full justify-start">Check Compliance Status</Button>
                  <Button variant="outline" className="w-full justify-start">Review Security Policies</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Suggested Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <button 
                    className="text-left w-full p-2 text-sm hover:bg-muted rounded-md"
                    onClick={() => {
                      setUserQuery("What vulnerabilities were found in the last scan?");
                      document.querySelector("form")?.dispatchEvent(
                        new Event("submit", { cancelable: true, bubbles: true })
                      );
                    }}
                  >
                    What vulnerabilities were found in the last scan?
                  </button>
                  <button 
                    className="text-left w-full p-2 text-sm hover:bg-muted rounded-md"
                    onClick={() => {
                      setUserQuery("What are the best password policies for my organization?");
                      document.querySelector("form")?.dispatchEvent(
                        new Event("submit", { cancelable: true, bubbles: true })
                      );
                    }}
                  >
                    What are the best password policies for my organization?
                  </button>
                  <button 
                    className="text-left w-full p-2 text-sm hover:bg-muted rounded-md"
                    onClick={() => {
                      setUserQuery("Can you scan my production environment for vulnerabilities?");
                      document.querySelector("form")?.dispatchEvent(
                        new Event("submit", { cancelable: true, bubbles: true })
                      );
                    }}
                  >
                    Can you scan my production environment for vulnerabilities?
                  </button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Assistant;
