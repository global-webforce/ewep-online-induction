import { Provider } from "@supabase/supabase-js";

import { AuthRepository } from "./auth-repository";
import { User } from "../models/user-schema";
import { createClient } from "@/utils/supabase/client-browser";
import { RegisterSchema } from "@/features/shared/models/register-input-schema";

import { LoginInput } from "../models/login-input-schema";
import { EmailInput } from "../models/email-input-schema";
import { userSchemaAdapterSupabase } from "../adapters/user-schema-supabase-adapter";

/**
 * A supabase implementation of the {@link AuthRepository} interface for CLIENT-SIDE authentication.
 * @important It uses BROWSER-CLIENT {@link createClient} to interact with Supabase.
 * Usage: Client-side components, hooks, etc.
 **/

export class AuthRepositoryRemote implements AuthRepository {
  async loginWithEmail(params: LoginInput): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword(params);

    if (error) throw new Error(error.message);
  }

  async registerWithEmail(params: RegisterSchema): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.auth.signUp({
      email: params.email,
      password: params.password,
      options: {
        data: {},
      },
    });

    if (error) throw new Error(error.message);
  }

  async verifyEmail(param: EmailInput): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.auth.resend({
      email: param,
      type: "signup",
    });
    if (error) throw new Error(error.message);
  }

  async logout(): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }

  async getSession(): Promise<User | null> {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getSession();

    if (error) return null;

    return userSchemaAdapterSupabase(data.user);
  }

  async setSession(payload: Record<string, any>): Promise<void> {
    const supabase = await createClient();
    const { access_token, refresh_token } = payload;

    if (!access_token || !refresh_token) {
      throw new Error("Invalid session payload");
    }

    const { error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
    if (error) throw error;
  }

  // Available/Observable on client-side.
  onSessionChange(callback: (user: User | null) => void): () => void {
    const supabase = createClient();
    const { subscription } = supabase.auth.onAuthStateChange(
      (_event: any, session: any) => {
        const user = session?.user
          ? userSchemaAdapterSupabase(session.user)
          : null;
        callback(user);
      }
    );
    return () => subscription.unsubscribe();
  }

  async loginWithProvider(
    provider: string,
    options?: { redirectTo?: string }
  ): Promise<void> {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as Provider,
      options,
    });

    if (error) throw new Error(error.message);
  }
}
