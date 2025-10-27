"use server";

import { formatError } from "@/adapters/errors-schema-adapter";
import {
  userUpdateFormSchema,
  UserUpdateFormSchema,
} from "@/features/auth-types";
import { createClient } from "@/utils/supabase/client-server";
import z from "zod";

export async function updateAction(values: UserUpdateFormSchema) {
  try {
    const parsedValue = userUpdateFormSchema.safeParse(values);
    if (parsedValue.error) {
      throw new Error(z.prettifyError(parsedValue.error));
    }
    const supabase = await createClient();
    const { data, error } = await supabase.auth.updateUser({
      email: values.email,
      password: values.password,

      data: {
        first_name: values.first_name,
        last_name: values.last_name,
      },
    });

    if (error) throw formatError(error);

    if (!data) return { data: null };

    return { data: data.user };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: "Unknown error" };
  }
}
