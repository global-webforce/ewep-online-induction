"use server";

import { mapError } from "@/adapters/errors-schema-adapter";
import { SignInInput, signInInputSchema } from "@/features/auth-types";
import { createClient } from "@/utils/supabase/client-server";

export async function signInAction(params: SignInInput) {
  const parsed = signInInputSchema.safeParse(params);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(params);
  // Will return error if email not verified
  if (error) throw mapError(error);
}
