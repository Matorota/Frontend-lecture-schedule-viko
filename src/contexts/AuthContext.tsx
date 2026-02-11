// Auth Context for managing authentication state
import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { apiService } from "../services/api";
import { TOKEN_KEY } from "../config";
import type { User, LoginCredentials, RegisterData } from "../types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        const userData = await apiService.getUserInfo();
        setUser(userData);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const response = await apiService.login(credentials);
    localStorage.setItem(TOKEN_KEY, response.token);
    await refreshUser();
  };

  const register = async (data: RegisterData) => {
    const response = await apiService.register(data);
    localStorage.setItem(TOKEN_KEY, response.token);
    await refreshUser();
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
