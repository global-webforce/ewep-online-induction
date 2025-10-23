"use server";

import {
  mapUser__,
  user__FormSchema,
  User__FormSchema,
  User__ProfileSchema,
  user__RowViewSchema,
} from "@/features/auth-types";
import { createClientAdmin } from "@/utils/supabase/client-server-admin";

export async function updateAction(id: string, values: User__FormSchema) {
  const parsedValue = user__FormSchema.safeParse(values);
  if (parsedValue.error) {
    throw new Error(parsedValue.error.message);
  }
  const supabase = createClientAdmin();
  const { data, error } = await supabase.auth.admin.updateUserById(id, {
    email: values.email,
    password: values.password,
    email_confirm: values.confirmed,
    user_metadata: <User__ProfileSchema>{
      first_name: values.first_name,
      last_name: values.last_name,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data) return null;

  const parsedResult = user__RowViewSchema.safeParse(mapUser__(data.user));
  if (parsedResult.error) {
    throw new Error(parsedResult.error.message);
  }

  return parsedResult.data;
}
