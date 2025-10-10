"use server";

import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import { formSchema, FormSchema } from "../types/form";

export async function updateAction(id: string, values: FormSchema) {
  const parsed = formSchema.safeParse(values);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }
  const supabase = createClientAdmin();
  const { data, error } = await supabase
    .from("induction_quiz")
    .update(parsed.data)
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
