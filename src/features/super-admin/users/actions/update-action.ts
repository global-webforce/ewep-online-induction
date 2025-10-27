"use server";

import { formatError } from "@/adapters/errors-schema-adapter";
import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import { U, updateSchema } from "../constants";

export async function updateAction(id: string, values: U) {
  try {
    const parsedValue = updateSchema.safeParse(values);
    if (parsedValue.error) {
      throw new Error(parsedValue.error.message);
    }
    const supabase = createClientAdmin();
    const { data, error } = await supabase.auth.admin.updateUserById(id, {
      email: values.email,
      password: values.password,
      email_confirm: true,
      app_metadata: {
        app_role: values.app_role,
      },
      user_metadata: {
        first_name: values.first_name,
        last_name: values.last_name,
      },
    });

    if (error) throw formatError(error);

    if (!data) return { data: null };

    return { data: data };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: "Unknown error" };
  }
}
