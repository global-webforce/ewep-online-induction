// app/providers/AuthProvider.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { authRepository } from "../repository/auth-repository";
import { AppUser } from "../models/app-user-schema";

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial fetch
    authRepository.getCurrentUser().then((u) => {
      setUser(u);
      setLoading(false);
    });

    // Listen to auth changes
    const unsubscribe = authRepository.onUserChange((u) => setUser(u));

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await authRepository.logout();
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
