"use server";

import { prettifyError } from "@/adapters/errors-schema-adapter";
import {
  ResetPasswordInput,
  resetPasswordInputSchema,
} from "@/features/auth-types";
import { createClient } from "@/utils/supabase/client-server";

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
  if (error) throw prettifyError(error);
}
