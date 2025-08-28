import { Provider } from "@supabase/supabase-js";
import { AuthRepository } from "./auth-repository";
import { User } from "../models/user-schema";
import { createClient } from "@/utils/supabase/client-server";
import { RegisterSchema } from "@/features/auth/register/register-schema";
import { userSchemaAdapterSupabase } from "../adapters/user-schema-adapter-supabase";

/**
 * A supabase implementation of the {@link AuthRepository} interface for server-side authentication.
 * @important It uses SERVER-CLIENT {@link createClient} to interact with Supabase.
 * @important You can only use this on either top route or layout.
 * Usage: Middleware, API routes, getServerSideProps, etc.
 **/

export class AuthRepositoryRemoteServer implements AuthRepository {
  async loginWithEmail(email: string, password: string): Promise<void> {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    if (!data.user) throw new Error("No user returned");
  }

  async registerWithEmail(param: RegisterSchema): Promise<void> {
    const supabase = await createClient();
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
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }

  async getCurrentUser(): Promise<User | null> {
    const supabase = await createClient();

    /**
     * Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure!
     * This value comes directly from the storage medium (usually cookies on the server) and may not be authentic.
     * Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server.
     * Dev Note: When I used getSession, I'm still logged in even if I already the deleted the user via Supabase Dashboard!!!
     * */

    const { data, error } = await supabase.auth.getUser();

    if (error) {
      if (data.user) {
        return userSchemaAdapterSupabase(data.user);
      }

      return null;
    }

    return !data.user ? null : userSchemaAdapterSupabase(data.user);
  }

  onUserChange(_: (_: any) => void): () => void {
    // ❌ Not available on server-side.
    return () => {};
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
    if (!data) throw new Error("No redirect URL returned");
  }
}
