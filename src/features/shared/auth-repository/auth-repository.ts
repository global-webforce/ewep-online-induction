import { SignUpInput } from "@/features/shared/models/sign-up-input-schema";
import { Email, EmailInput } from "../models/email-input-schema";
import { SignInInput } from "../models/sign-in-input-schema";
import { User } from "../models/user-schema";

export interface AuthRepository {
  signIn: (data: SignInInput) => Promise<void>;
  signUp: (data: SignUpInput) => Promise<void>;
  signOut: () => Promise<void>;
  verifyEmail: (data: Email) => Promise<void>;
  forgotPassword: (data: EmailInput) => Promise<void>;
  getSession: () => Promise<User | null>;
  setSession(payload: Record<string, any>): Promise<void>;
}
