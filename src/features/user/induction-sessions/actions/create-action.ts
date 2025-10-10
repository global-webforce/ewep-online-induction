"use server";

import { createClient } from "@/utils/supabase/client-server";
import { formSchema, FormSchema } from "../types/form";

export async function createAction(values: FormSchema) {
  const parsed = formSchema.safeParse(values);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("induction_sessions")
    .upsert(
      {
        induction_id: parsed.data.induction_id,
        valid_until: parsed.data.valid_until,
        user_id: parsed.data.user_id,
        created_at: new Date().toISOString(),
      },
      { onConflict: "user_id, induction_id" }
    )
    .select()
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
