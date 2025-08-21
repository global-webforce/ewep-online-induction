import { RegisterSchema } from "../../register/register-schema";
import { AuthRepositoryRemote } from "./auth-repository-remote";

export interface AuthRepository {
  // Email/password login
  loginWithEmail: (
    email: string,
    password: string
  ) => Promise<{ user: { id: string; email: string } }>;

  // Email/password registration
  registerWithEmail: (
    data: RegisterSchema
  ) => Promise<{ user: { id: string; email: string } }>;

  // Log out
  logout: () => Promise<void>;

  // Current user
  getCurrentUser: () => Promise<{
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  } | null>;

  // Listen to auth state changes (login/logout/session refresh)
  onUserChange: (
    callback: (
      user: {
        id: string;
        email: string;
        firstName?: string;
        lastName?: string;
      } | null
    ) => void
  ) => () => void;
}

// OAuth login (Google, GitHub, etc.)
loginWithProvider: (
  provider: "google" | "github" | "facebook" | "twitter" | string,
  options?: { redirectTo?: string }
) => Promise<{ url: string }>;

export const authRepository: AuthRepository = new AuthRepositoryRemote();
