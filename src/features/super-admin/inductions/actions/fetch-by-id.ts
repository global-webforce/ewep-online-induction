"use server";

import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import { RowSchema } from "../types/row";

export async function fetchById(id: string) {
  const supabase = createClientAdmin();
  const { data, error } = await supabase
    .from("inductions")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw Error(error.message);
  }

  return data as RowSchema;
}
