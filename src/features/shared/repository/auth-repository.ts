import { RegisterSchema } from "@/features/shared/models/register-input-schema";
import { User } from "../models/user-schema";
import { LoginInput } from "../models/login-input-schema";
import { EmailInput } from "../models/email-input-schema";

export interface AuthRepository {
  loginWithEmail: (data: LoginInput) => Promise<void>;
  loginWithProvider: (
    provider: "google" | "facebook" | string,
    options?: { redirectTo?: string }
  ) => Promise<void>;
  registerWithEmail: (data: RegisterSchema) => Promise<void>;
  verifyEmail: (data: EmailInput) => Promise<void>;
  logout: () => Promise<void>;

  getSession: () => Promise<User | null>;
  setSession(payload: Record<string, any>): Promise<void>;
}
