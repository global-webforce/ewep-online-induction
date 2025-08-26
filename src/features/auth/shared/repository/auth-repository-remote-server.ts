import { Provider } from "@supabase/supabase-js";
import { RegisterSchema } from "../../register/register-schema";
import { AuthRepository } from "./auth-repository";
import { User } from "../models/user-schema";
import { createClient } from "@/utils/supabase/client-server";

/**
 * A supabase implementation of the {@link AuthRepository} interface for server-side authentication.
 * @important It uses SERVER-CLIENT {@link createClient} to interact with Supabase.
 * Usage: Middleware, API routes, getServerSideProps, etc.
 * @important You can only use this on either top route or layout.
 * @important On interactive components, you should wrap the method in
 **/

export class AuthRepositoryRemoteServer implements AuthRepository {
  async loginWithEmail(email: string, password: string): Promise<void> {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    if (!data) throw new Error("No user returned");
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
     * */

    /// Dev Note: When I used getSession, I'm still logged in even if I already the deleted the user via Supabase Dashboard!!!

    const { data, error } = await supabase.auth.getUser();

    if (error) {
      return null;
    }

    const session = data.user;

    return !session
      ? null
      : {
          id: data?.user?.id || "",
          email: data?.user?.email || "",
          roles: ["admin"],
          profile: {
            firstName: data?.user?.user_metadata?.firstName || "",
            lastName: data?.user?.user_metadata?.lastName || "",
            avatarUrl: data?.user?.user_metadata?.avatar_url || "",
          },
        };
  }

  onUserChange(callback: (user: User | null) => void): () => void {
    // ❌ Not available on server-side.
    // Supabase onAuthStateChange only works in the browser client.
    // On the server, fetch the user once per request using supabase.auth.getSession().
    return () => {
      // noop
    };
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
