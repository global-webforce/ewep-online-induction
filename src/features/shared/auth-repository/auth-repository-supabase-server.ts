import { Provider } from "@supabase/supabase-js";
import { AuthRepository } from "./auth-repository";
import { User } from "../models/user-schema";
import { createClient } from "@/utils/supabase/client-server";
import { createClient as createClientAdmin } from "@/utils/supabase/client-server-admin";

import { userSchemaAdapterSupabase } from "../adapters/user-schema-supabase-adapter";
import { mapSupabaseError } from "../adapters/errors-schema-supabase-adapter";

import { SignInInput } from "@/features/auth/sign-in/schema";
import { SignUpInput } from "@/features/auth/sign-up/schema";

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

    const supabaseAdmin = await createClientAdmin();

    const { data: email } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("email", params.email)
      .maybeSingle();

    if (email) {
      /*    if (!email?.email_confirmed_at) {
        throw mapSupabaseError(Error("email confirmation required"));
      } */

      throw new Error("A user with this email already exists.");
    }

    const { data, error } = await supabase.auth.signUp({
      email: params.email,
      password: params.password,
    });

    if (error) throw mapSupabaseError(error);

    // If confirmation is required, data will have user value and session will be null
    if (!data.user?.email_confirmed_at) {
      throw mapSupabaseError(Error("email confirmation required"));
    }

    // If confirmation not required, user and session will exist
    if (data.session) {
      console.log(data);
    }
  }

  async signOut(): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw mapSupabaseError(error);
  }

  async verifyEmail(params: string): Promise<void> {
    /*
NOTE: Important!
ON Supabase > Authentication > Configuration > Emails > Confirm signup, update the content with this:

<h2>Confirm your signup</h2>

<p>Follow this link to confirm your user:</p>
<p><a href="{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=signup&redirect_to={{ .RedirectTo  }}">Confirm your mail</a></p>

*/

    const supabase = await createClient();
    const { error } = await supabase.auth.resend({
      email: params,
      type: "signup",
    });
    if (error) throw mapSupabaseError(error);
  }

  async forgotPassword(param: string): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(param);
    if (error) throw mapSupabaseError(error);
  }

  async updatePassword(param: string): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({ password: param });
    if (error) throw mapSupabaseError(error);
  }

  /*
   * Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure!
   * This value comes directly from the storage medium (usually cookies on the server) and may not be authentic.
   * Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server.
   * Dev Note: When I used supabase.auth.getSession, I'm still logged in even if I already the deleted the user via Supabase Dashboard!!!
   **/

  async getUser(): Promise<User | null> {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) return null;

    return userSchemaAdapterSupabase(data.user);
  }

  async setUser(payload: Record<string, any>): Promise<void> {
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
