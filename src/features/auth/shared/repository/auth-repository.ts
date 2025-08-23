import { RegisterSchema } from "../../register/register-schema";
import { User } from "../models/user-schema";

export interface AuthRepository {
  // Email/password login
  loginWithEmail: (email: string, password: string) => Promise<void>;

  // Email/password registration
  registerWithEmail: (data: RegisterSchema) => Promise<void>;

  // Log out
  logout: () => Promise<void>;

  // Current user
  getCurrentUser: () => Promise<User | null>;

  // Listen to auth state changes (login/logout/session refresh)
  onUserChange: (callback: (user: User | null) => void) => () => void;

  // OAuth login (Google, GitHub, etc.)
  loginWithProvider: (
    provider: "google" | "github" | "facebook" | "twitter" | string,
    options?: { redirectTo?: string }
  ) => Promise<void>;
}
