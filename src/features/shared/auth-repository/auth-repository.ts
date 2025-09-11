import { User } from "../models/user-schema";

export interface AuthRepository {
  signIn: (data: any) => Promise<void>;
  signUp: (data: any) => Promise<void>;
  signOut: () => Promise<void>;
  verifyEmail: (data: any) => Promise<void>;
  forgotPassword: (data: any) => Promise<void>;
  getUser: () => Promise<User | null>;
  setUser(payload: Record<string, any>): Promise<void>;
}
