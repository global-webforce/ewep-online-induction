"use server";

import { prettifyError } from "@/adapters/errors-schema-adapter";
import { SignInInput, signInInputSchema } from "@/features/auth-types";
import { createClient } from "@/utils/supabase/client-server";
import z from "zod";

export async function signInAction(params: SignInInput) {
  try {
    const parsed = signInInputSchema.safeParse(params);
    if (parsed.error) {
      throw new Error(z.prettifyError(parsed.error));
    }
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword(params);

    if (error) throw prettifyError(error);

    return { success: true };
  } catch (e) {
    if (e instanceof Error) return { error: e.message };
    return { error: "Unknown error" };
  }
}
