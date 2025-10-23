"use server";

import { prettifyError } from "@/adapters/errors-schema-adapter";
import {
  superAdmin__ProfileSchema,
  SuperAdmin__ProfileSchema,
} from "@/features/auth-types";
import { createClient } from "@/utils/supabase/client-server";

export async function profileUpdateAction(values: SuperAdmin__ProfileSchema) {
  const parsed = superAdmin__ProfileSchema.safeParse(values);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.updateUser({ data: parsed.data });
  if (error) throw prettifyError(error);

  if (!data) return null;

  const user_metadata = superAdmin__ProfileSchema.safeParse(
    data.user.user_metadata
  );
  if (user_metadata.error) {
    throw new Error(user_metadata.error.message);
  }

  return user_metadata.data;
}
