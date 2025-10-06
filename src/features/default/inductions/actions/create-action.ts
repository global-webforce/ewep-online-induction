"use server";

import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import { formSchema, FormSchema } from "../types/form";

export async function createAction(values: FormSchema) {
  const parsed = formSchema.safeParse(values);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }
  const supabase = createClientAdmin();
  const { data, error } = await supabase
    .from("inductions")
    .insert(parsed.data)
    .select()
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
