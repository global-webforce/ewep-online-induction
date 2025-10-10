"use server";

import { createClient } from "@/utils/supabase/client-server";
import { RowSchema } from "../types/row";

export async function fetchById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("induction_sessions_user_view")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw Error(error.message);
  }

  return data as RowSchema;
}
