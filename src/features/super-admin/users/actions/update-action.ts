"use server";

import { mapUser, userSchema } from "@/features/auth-types";
import { createClientAdmin } from "@/utils/supabase/client-server-admin";

export async function updateAction(id: string, confirm: boolean) {
  const supabase = createClientAdmin();
  const { data, error } = await supabase.auth.admin.updateUserById(id, {
    email_confirm: confirm,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data) return null;

  const parsedResult = userSchema.safeParse(mapUser(data.user));
  if (parsedResult.error) {
    throw new Error(parsedResult.error.message);
  }

  return parsedResult.data;
}
