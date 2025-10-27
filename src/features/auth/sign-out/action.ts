"use server";

import { formatError } from "@/adapters/errors-schema-adapter";
import { createClient } from "@/utils/supabase/client-server";

export async function logoutAction() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) return { error: formatError(error) };
}
