"use server";

import { mapError } from "@/adapters/errors-schema-adapter";
import { createClient } from "@/utils/supabase/client-server";
import { ProfileInput, profileInputSchema } from "./schema";

export async function profileUpdateAction(values: ProfileInput) {
  const parsed = profileInputSchema.safeParse(values);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.updateUser({ data: parsed.data });
  if (error) throw mapError(error);

  const user_metadata = profileInputSchema.safeParse(data.user.user_metadata);
  if (!user_metadata.success) {
    throw new Error(user_metadata.error.message);
  }
  return user_metadata.data;
}
