"use server";

import { createClient } from "@/utils/supabase/client-server";
import { RowSchema } from "../types";

export async function fetchAll() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("inductions_user_view")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    throw Error(error.message);
  }
  return data as RowSchema[];
}
