"use server";

import { formatError } from "@/adapters/errors-schema-adapter";
import { mapUser } from "@/features/auth-types";
import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import z from "zod";
import { rowSchema } from "../constants";

export async function fetchById(id: string) {
  try {
    const supabase = createClientAdmin();

    const { data, error } = await supabase.auth.admin.getUserById(id);
    if (error) throw formatError(error);

    if (!data) return { data: null };

    const parsedResult = rowSchema.safeParse(mapUser(data.user));
    if (parsedResult.error) {
      throw new Error(z.prettifyError(parsedResult.error));
    }

    return { data: parsedResult.data };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: "Unknown error" };
  }
}
