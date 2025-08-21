// infra/authRepositoryRemote.ts
import { Provider } from "@supabase/supabase-js";
import { AuthRepository } from "./auth-repository";
import { getSupabaseClient } from "@/supabase/getSupabaseClient";
import { RegisterSchema } from "../../register/register-schema";
import { email } from "zod";

export class AuthRepositoryRemote implements AuthRepository {
  async loginWithEmail(
    email: string,
    password: string
  ): Promise<{ user: { id: string; email: string } }> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    if (!data.user) throw new Error("No user returned");

    return {
      user: { id: data.user.id, email: data.user.email! },
    };
  }

  async registerWithEmail(
    data: RegisterSchema
  ): Promise<{ user: { id: string; email: string } }> {
    const supabase = getSupabaseClient();
    const { res, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {},
      },
    });

    if (error) throw new Error(error.message);
    if (!res.user) throw new Error("No user returned");

    return {
      user: { id: res.user.id, email: res.user.email! },
    };
  }

  async logout(): Promise<void> {
    const supabase = getSupabaseClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }

  async getCurrentUser(): Promise<{
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  } | null> {
    const supabase = getSupabaseClient();
    // Check if session exists
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.warn("Supabase session error:", sessionError.message);
      return null;
    }

    if (!session) return null; // no logged-in user

    return {
      id: session.user.id,
      email: session.user.email!,
      firstName: session.user.user_metadata?.firstName,
      lastName: session.user.user_metadata?.lastName,
    };
  }

  onUserChange(
    callback: (
      user: {
        id: string;
        email: string;
        firstName?: string;
        lastName?: string;
      } | null
    ) => void
  ): () => void {
    const supabase = getSupabaseClient(); // browser singleton client

    const { subscription } = supabase.auth.onAuthStateChange(
      (_event: any, session: any) => {
        const u = session?.user
          ? {
              id: session.user.id,
              email: session.user.email!,
              firstName: session.user.user_metadata?.firstName,
              lastName: session.user.user_metadata?.lastName,
            }
          : null;

        callback(u);
      }
    );

    // Return unsubscribe function
    return () => subscription.unsubscribe();
  }

  async loginWithProvider(
    provider: string,
    options?: { redirectTo?: string }
  ): Promise<{ url: string }> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as Provider,
      options,
    });

    if (error) throw new Error(error.message);
    if (!data?.url) throw new Error("No redirect URL returned");

    return { url: data.url };
  }
}
