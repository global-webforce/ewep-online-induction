import { Provider } from "@supabase/supabase-js";
import { RegisterSchema } from "../../register/register-schema";
import { AuthRepository } from "./auth-repository";
import { User } from "../models/user-schema";
import { getSupabaseClient } from "@/supabase/get-supabase-client";

/// Implementation of AuthRepository for server-side operations using Supabase.
/// Note: Some methods like onUserChange are not applicable on the server side.
/// For server-side auth, fetch the session directly per request.
/// See https://supabase.com/docs/guides/auth/auth-helpers/nextjs/server-side
/// and https://supabase.com/docs/guides/auth/auth-helpers/nextjs/api-routes
/// for more details.
/// Usage: Middleware, API routes, getServerSideProps, etc.

export class AuthRepositoryRemoteServerSide implements AuthRepository {
  async loginWithEmail(email: string, password: string): Promise<void> {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    if (!data.user) throw new Error("No user returned");
  }

  async registerWithEmail(param: RegisterSchema): Promise<void> {
    const supabase = await getSupabaseClient();
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
    const supabase = await getSupabaseClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }

  async getCurrentUser(): Promise<User | null> {
    const supabase = await getSupabaseClient();
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

  onUserChange(): () => void {
    // ⚠️ Not supported on the server.
    // Supabase auth state changes can only be observed on the client.
    // On the server, fetch the session directly per request instead.
    return () => void 0;
  }

  async loginWithProvider(
    provider: string,
    options?: { redirectTo?: string }
  ): Promise<void> {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as Provider,
      options,
    });

    if (error) throw new Error(error.message);
    if (!data) throw new Error("No redirect URL returned");
  }
}

export const authRepositoryServer: AuthRepository =
  new AuthRepositoryRemoteServerSide();
