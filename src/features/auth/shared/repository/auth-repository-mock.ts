import { RegisterSchema } from "../../register/register-schema";
import { User } from "../models/user-schema";
import { AuthRepository } from "./auth-repository";

/**
 * A MOCK implementation of the {@link AuthRepository} interface for CLIENT-SIDE authentication.
 * @important It uses BROWSER-CLIENT {@link getSupabaseClient} to interact with Supabase.
 * Usage: Client-side components, hooks, etc.
 **/

export class AuthRepositoryMock implements AuthRepository {
  private currentUser: User | null = null;
  private listeners: Array<(user: User | null) => void> = [];

  async loginWithEmail(email: string, password: string): Promise<void> {
    // Fake login: accept any credentials
    this.currentUser = {
      id: "mock-user-id",
      email,
      roles: [],
    };
    this.notifyListeners();
  }

  async registerWithEmail(data: RegisterSchema): Promise<void> {
    // Fake registration: auto-login user after register
    this.currentUser = {
      id: "mock-user-id",
      email: data.email,
      roles: [],
    };
    this.notifyListeners();
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    this.notifyListeners();
  }

  async getCurrentUser(): Promise<User | null> {
    return this.currentUser;
  }

  onUserChange(callback: (user: User | null) => void): () => void {
    this.listeners.push(callback);
    // immediately invoke with current user
    callback(this.currentUser);

    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  async loginWithProvider(
    provider: "google" | "github" | "facebook" | "twitter" | string,
    options?: { redirectTo?: string }
  ): Promise<void> {
    // Fake provider login: always succeed
    this.currentUser = {
      id: `mock-${provider}-id`,
      email: `${provider}_user@example.com`,
      roles: ["admin"],
    };
    this.notifyListeners();
  }

  // --- internal helper ---
  private notifyListeners() {
    for (const cb of this.listeners) {
      cb(this.currentUser);
    }
  }
}
