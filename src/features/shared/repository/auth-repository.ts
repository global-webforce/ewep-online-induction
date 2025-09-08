import { SignUpInput } from "@/features/shared/models/sign-up-input-schema";
import { User } from "../models/user-schema";
import { SignInInput } from "../models/sign-in-input-schema";
import { EmailInput } from "../models/email-input-schema";

export interface AuthRepository {
  signIn: (data: SignInInput) => Promise<void>;
  signUp: (data: SignUpInput) => Promise<void>;
  signOut: () => Promise<void>;
  verifyEmail: (data: EmailInput) => Promise<void>;
  forgotPassword: (data: EmailInput) => Promise<void>;
  getSession: () => Promise<User | null>;
  setSession(payload: Record<string, any>): Promise<void>;
}
