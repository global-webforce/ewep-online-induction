"use server";

import { createClient } from "@/utils/supabase/client-server";
import { RowSchema } from "../types/row";

export async function fetchAll() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("induction_sessions_user_view")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw Error(error.message);
  }
  return data as RowSchema[];
}
