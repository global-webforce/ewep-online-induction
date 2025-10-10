"use server";

import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import { FormSchema, formSchema } from "../types/form";

export async function createAction(values: FormSchema) {
  const parsed = formSchema.safeParse(values);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }
  const supabase = createClientAdmin();
  const { data, error } = await supabase
    .from("induction_quiz")
    .insert(parsed.data)
    .select()
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
