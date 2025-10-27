"use server";

import { formatError } from "@/adapters/errors-schema-adapter";
import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import z from "zod";
import { C, createSchema } from "../constants";

export async function createAction(values: C) {
  try {
    const parsedValue = createSchema.safeParse(values);
    if (parsedValue.error) {
      throw new Error(z.prettifyError(parsedValue.error));
    }
    const supabase = createClientAdmin();
    const { data, error } = await supabase.auth.admin.createUser({
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

    return { data: data.user };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: "Unknown error" };
  }
}
