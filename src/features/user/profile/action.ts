"use server";

import { mapError } from "@/adapters/errors-schema-adapter";
import {
  user__ProfileSchema,
  User__ProfileSchema,
} from "@/features/auth-types";
import { createClient } from "@/utils/supabase/client-server";

export async function profileUpdateAction(values: User__ProfileSchema) {
  const parsed = user__ProfileSchema.safeParse(values);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.updateUser({ data: parsed.data });
  if (error) throw mapError(error);

  if (!data) return null;

  const user_metadata = user__ProfileSchema.safeParse(data.user.user_metadata);
  if (user_metadata.error) {
    throw new Error(user_metadata.error.message);
  }

  return user_metadata.data;
}
