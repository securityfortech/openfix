
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  email: string;
  fullName?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is stored in localStorage on initial load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // For demo purposes, we'll accept any login
      // In a real app, this would validate credentials against a backend
      const mockUser = {
        id: `user-${Date.now()}`,
        email: email,
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Invalid credentials");
    }
  };

  const signup = async (fullName: string, email: string, password: string) => {
    try {
      // For demo purposes, we'll create a mock user
      // In a real app, this would register the user in a backend
      const mockUser = {
        id: `user-${Date.now()}`,
        email: email,
        fullName: fullName,
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
      throw new Error("Unable to create account");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
