
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Vulnerabilities from "./pages/Vulnerabilities";
import Assets from "./pages/Assets";
import Assistant from "./pages/Assistant";
import Settings from "./pages/Settings";
import Teams from "./pages/Teams";
import { useState } from "react";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Auth route component - redirects to dashboard if already logged in
const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  
  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }
  
  if (user && (location.pathname === "/login" || location.pathname === "/signup")) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={
        <AuthRoute>
          <Login />
        </AuthRoute>
      } />
      <Route path="/signup" element={
        <AuthRoute>
          <Signup />
        </AuthRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/vulnerabilities" element={
        <ProtectedRoute>
          <Vulnerabilities />
        </ProtectedRoute>
      } />
      <Route path="/assets" element={
        <ProtectedRoute>
          <Assets />
        </ProtectedRoute>
      } />
      <Route path="/teams" element={
        <ProtectedRoute>
          <Teams />
        </ProtectedRoute>
      } />
      <Route path="/assistant" element={
        <ProtectedRoute>
          <Assistant />
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  // Create QueryClient inside the component
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
