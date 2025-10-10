"use server";

import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import { RowSchema } from "../types/row";

export async function fetchAll(id: string) {
  const supabase = createClientAdmin();
  const { data, error } = await supabase
    .from("induction_quiz")
    .select("*")
    .eq("induction_id", id)
    .order("created_at", { ascending: false });

  if (error) {
    throw Error(error.message);
  }
  return data as RowSchema[];
}
