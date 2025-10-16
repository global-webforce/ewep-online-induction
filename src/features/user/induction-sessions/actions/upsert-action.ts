"use server";

import {
  sessionFormRLSSchema,
  SessionFormRLSSchema,
  sessionRowSchema,
} from "@/features/types";
import { createClient } from "@/utils/supabase/client-server";

export async function upsertAction(values: SessionFormRLSSchema) {
  const parsed = sessionFormRLSSchema.safeParse(values);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("induction_sessions")
    .upsert(parsed.data, { onConflict: "user_id, induction_id" })
    .select()
    .maybeSingle();

  if (error) {
    throw Error(error.message);
  }

  if (!data) return null;

  const parsedResult = sessionRowSchema.safeParse(data);
  if (parsedResult.error) {
    throw new Error(parsedResult.error.message);
  }

  return parsedResult.data;
}
