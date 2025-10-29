"use server";

import { formatError } from "@/adapters/errors-schema-adapter";
import {
  sessionFormRLSSchema,
  SessionFormRLSSchema,
  sessionRowSchema,
} from "@/features/types";
import { createClient } from "@/utils/supabase/client-server";
import z from "zod";

export async function upsertAction(values: SessionFormRLSSchema) {
  try {
    const parsedValue = sessionFormRLSSchema.safeParse(values);
    if (parsedValue.error) {
      throw new Error(z.prettifyError(parsedValue.error));
    }
    const supabase = await createClient();
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
