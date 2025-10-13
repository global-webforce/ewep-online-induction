"use server";

import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import { viewSchema } from "../types/view";

export async function fetchById(induction_id: string) {
  const supabase = createClientAdmin();
  const { data, error } = await supabase
    .from("induction_single_resources_user_view")
    .select("*")
    .eq("id", induction_id)
    .single();

  if (error) throw Error(error.message);

  const parsed = viewSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  return parsed.data;
}
