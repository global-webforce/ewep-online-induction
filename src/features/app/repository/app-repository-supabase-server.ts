import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import { AppRepository } from "./app-repository";
import { cache } from "react";
import { createClient } from "@supabase/supabase-js";

/**
 * A supabase implementation of the {@link AuthRepository} interface for server-side authentication.
 * @important It uses SERVER-CLIENT {@link createClient} to interact with Supabase.
 * @important You can only use this on either top route or layout.
 * Usage: Middleware, API routes, getServerSideProps, etc.
 **/

export class AppRepositorySupabaseServer implements AppRepository {
  getInductions = cache(async (): Promise<any> => {
    const supabase = await createClientAdmin();

    const { data, error } = await supabase
      .from("inductions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[getInductions] error:", error.message);
      return [];
    }

    return data;
  });
}
