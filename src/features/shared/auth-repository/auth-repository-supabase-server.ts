import { Provider } from "@supabase/supabase-js";
import { AuthRepository } from "./auth-repository";
import { User } from "../models/user-schema";
import { createClient } from "@/utils/supabase/client-server";
import { SignInInput } from "../models/sign-in-input-schema";
import { Email, EmailInput } from "../models/email-input-schema";
import { userSchemaAdapterSupabase } from "../adapters/user-schema-supabase-adapter";
import { mapSupabaseError } from "../adapters/errors-schema-supabase-adapter";
import { SignUpInput } from "../models/sign-up-input-schema";

/**
 * A supabase implementation of the {@link AuthRepository} interface for server-side authentication.
 * @important It uses SERVER-CLIENT {@link createClient} to interact with Supabase.
 * @important You can only use this on either top route or layout.
 * Usage: Middleware, API routes, getServerSideProps, etc.
 **/

export class AuthRepositorySupabaseServer implements AuthRepository {
  async signIn(params: SignInInput): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword(params);

    // Will return error if email not verified
    if (error) throw mapSupabaseError(error);
  }

  async signUp(params: SignUpInput): Promise<void> {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email: params.email,
      password: params.password,
      options: {
        data: {},
      },
    });

    if (error) throw mapSupabaseError(error);

    // If confirmation is required, session will be null
    if (!error && !data.session) {
      throw mapSupabaseError(Error("email confirmation required"));
    }

    // If confirmation not required, session exists
    if (data.session) {
      console.log("User signed up and logged in:", data.session);
    }
  }

  async signOut(): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw mapSupabaseError(error);
  }

  async verifyEmail(params: Email): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.auth.resend({
      email: params,
      type: "signup",
    });
    if (error) throw mapSupabaseError(error);
  }

  async forgotPassword(params: EmailInput): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(params.email);
    if (error) throw mapSupabaseError(error);
  }

  /*
   * Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure!
   * This value comes directly from the storage medium (usually cookies on the server) and may not be authentic.
   * Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server.
   * Dev Note: When I used getSession, I'm still logged in even if I already the deleted the user via Supabase Dashboard!!!
   **/

  async getSession(): Promise<User | null> {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
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

  // Not available on server-side.
  onSessionChange(_: (_: any) => void): () => void {
    return () => {};
  }

  async signInWithProvider(
    provider: string,
    options?: { redirectTo?: string }
  ): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider as Provider,
      options,
    });

    if (error) throw mapSupabaseError(error);
  }
}
