"use server";

import { mapError } from "@/adapters/errors-schema-adapter";
import { createClient } from "@/utils/supabase/client-server";
import { ResetPasswordInput, resetPasswordInputSchema } from "./schema";

export async function resetPasswordAction(values: ResetPasswordInput) {
  const parsed = resetPasswordInputSchema.safeParse(values);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password: parsed.data.confirm_password,
  });
  await supabase.auth.signOut();
  if (error) throw mapError(error);
}
