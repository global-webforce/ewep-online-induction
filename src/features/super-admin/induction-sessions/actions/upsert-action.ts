"use server";

import {
  sessionFormSchema,
  SessionFormSchema,
  sessionRowSchema,
} from "@/features/types";
import { createClientAdmin } from "@/utils/supabase/client-server-admin";

export async function upsertAction(values: SessionFormSchema) {
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

  if (error) {
    throw new Error(error.message);
  }

  if (!data) return null;
  const parsedResult = sessionRowSchema.safeParse(data);
  if (parsedResult.error) {
    throw new Error(parsedResult.error.message);
  }

  return parsedResult.data;
}
