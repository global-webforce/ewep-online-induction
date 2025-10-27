"use server";

import { formatError } from "@/adapters/errors-schema-adapter";
import {
  sessionFormSchema,
  SessionFormSchema,
  sessionRowSchema,
} from "@/features/types";
import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import z from "zod";

export async function upsertAction(values: SessionFormSchema) {
  try {
    const parsedValue = sessionFormSchema.safeParse(values);
    if (parsedValue.error) {
      throw new Error(parsedValue.error.message);
    }
    const supabase = createClientAdmin();
    const { data, error } = await supabase
      .from("induction_sessions")
      .upsert(parsedValue.data, { onConflict: "user_id, induction_id" })
      .select()
      .maybeSingle();

    if (error) throw formatError(error);

    if (!data) return { data: null };
    const parsedResult = sessionRowSchema.safeParse(data);
    if (parsedResult.error) {
      throw new Error(z.prettifyError(parsedResult.error));
    }

    return { data: parsedResult.data };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: "Unknown error" };
  }
}
