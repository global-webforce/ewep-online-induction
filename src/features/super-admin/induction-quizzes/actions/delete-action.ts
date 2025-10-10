"use server";

import { createClientAdmin } from "@/utils/supabase/client-server-admin";

export async function deleteAction(id: number) {
  const supabase = createClientAdmin();

  const { data, error } = await supabase
    .from("induction_quiz")
    .delete()
    .eq("id", id) // 🧠 delete only this record
    .select()
    .maybeSingle(); // returns the deleted row if found

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
