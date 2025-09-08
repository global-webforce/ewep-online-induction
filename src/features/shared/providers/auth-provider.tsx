/* "use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { User } from "../models/user-schema";
import { AuthRepositoryRemote } from "../repository/auth-repository-remote-client";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const authRepository = new AuthRepositoryRemote();

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

/// This is only used onced in the app tree wrapping root layout chilren.
/// It provides auth state to the rest of the app - client side only.

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authRepository.getSession().then((u) => {
      setUser(u);
      setLoading(false);
    });

    // Listen to auth changes
    const unsubscribe = authRepository.onSessionChange((u) => setUser(u));

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
 */
