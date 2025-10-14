"use server";

import { mapError } from "@/adapters/errors-schema-adapter";
import { createClient } from "@/utils/supabase/client-server";

export async function logoutAction() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw mapError(error);
  //redirect(`/sign-in`, RedirectType.replace);
}
