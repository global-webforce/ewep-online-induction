"use server";

import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import { inductionWithResourcesSchema } from "../types/induction-with-resources";

export async function fetchInductionAndResourcesById(id: string) {
  const supabase = createClientAdmin();
  const { data, error } = await supabase
    .from("inductions")
    .select(
      `
    id,
    title,
    description,
    validity_days,
    status,
    created_at,
     induction_resources (
      id,
      induction_id,
      question,
      options,
      correct_answer,
      created_at
    )`
    )
    .eq("id", id)
    .single();

  if (error) throw Error(error.message);

  if (data) {
  }
  const parsed = inductionWithResourcesSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  return parsed.data;
}
