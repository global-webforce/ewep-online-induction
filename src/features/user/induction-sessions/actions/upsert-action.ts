"use server";

import { createClient } from "@/utils/supabase/client-server";
import { formSchema, FormSchema } from "../types/form";

export async function upsertAction(values: FormSchema) {
  const parsed = formSchema.safeParse(values);
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
    throw new Error(error.message);
  }

  return data;
}
