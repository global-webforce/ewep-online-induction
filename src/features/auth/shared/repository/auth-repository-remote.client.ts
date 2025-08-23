import { Provider } from "@supabase/supabase-js";
import { RegisterSchema } from "../../register/register-schema";
import { AuthRepository } from "./auth-repository";
import { User } from "../models/user-schema";
import { getSupabaseClient } from "@/supabase/get-supabase-client.client";

/**
 * A supabase implementation of the {@link AuthRepository} interface for CLIENT-SIDE authentication.
 * @important It uses BROWSER-CLIENT {@link getSupabaseClient} to interact with Supabase.
 * Usage: Client-side components, hooks, etc.
 **/

export class AuthRepositoryRemote implements AuthRepository {
  async loginWithEmail(email: string, password: string): Promise<void> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    if (!data) throw new Error("No user returned");
  }

  async registerWithEmail(param: RegisterSchema): Promise<void> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.auth.signUp({
      email: param.email,
      password: param.password,
      options: {
        data: {},
      },
    });

    if (error) throw new Error(error.message);
    if (!data) throw new Error("No user returned");
  }

  async logout(): Promise<void> {
    const supabase = getSupabaseClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }

  async getCurrentUser(): Promise<User | null> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.warn("Supabase session error:", error.message);
      return null;
    }

    const session = data.session;

    return !session
      ? null
      : {
          id: session?.user?.id || "",
          email: session?.user?.email || "",
          roles: [],
          profile: {
            firstName: session?.user?.user_metadata?.firstName || "",
            lastName: session?.user?.user_metadata?.lastName || "",
            avatarUrl: session?.user?.user_metadata?.avatar_url || "",
          },
        };
  }

  onUserChange(callback: (user: User | null) => void): () => void {
    const supabase = getSupabaseClient();
    const { subscription } = supabase.auth.onAuthStateChange(
      (_event: any, session: any) => {
        const user: User | null = !session
          ? null
          : {
              id: session?.user?.id || "",
              email: session?.user?.email || "",
              roles: [],
              profile: {
                firstName: session?.user?.user_metadata?.firstName || "",
                lastName: session?.user?.user_metadata?.lastName || "",
                avatarUrl: session?.user?.user_metadata?.avatar_url || "",
              },
            };
        callback(user);
      }
    );

    return () => subscription.unsubscribe();
  }

  async loginWithProvider(
    provider: string,
    options?: { redirectTo?: string }
  ): Promise<void> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as Provider,
      options,
    });

    if (error) throw new Error(error.message);
    if (!data?.url) throw new Error("No redirect URL returned");
  }
}

export const authRepository: AuthRepository = new AuthRepositoryRemote();
