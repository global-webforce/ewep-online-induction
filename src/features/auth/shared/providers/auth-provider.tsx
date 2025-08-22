// app/providers/AuthProvider.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { User } from "../models/user-schema";
import { authRepository } from "../repository";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
