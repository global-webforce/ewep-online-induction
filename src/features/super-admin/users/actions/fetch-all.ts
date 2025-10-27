"use server";

import { formatError } from "@/adapters/errors-schema-adapter";
import { mapUser } from "@/features/auth-types";
import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import z from "zod";
import { rowSchema } from "../constants";

export async function fetchAll() {
  try {
    const supabase = createClientAdmin();

    const { data, error } = await supabase.auth.admin.listUsers();

    if (error) throw formatError(error);

    if (!data) return { data: null };

    const mapped = data.users.map((e) => mapUser(e));

    const parsedResult = z.array(rowSchema).safeParse(mapped);
    if (parsedResult.error) {
      throw new Error(z.prettifyError(parsedResult.error));
    }

    return { data: parsedResult.data };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: "Unknown error" };
  }
}
