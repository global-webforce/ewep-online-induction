"use server";

import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import { TableSchema } from "./types";

export async function getAll() {
  const supabase = createClientAdmin();
  const { data, error } = await supabase
    .from("admin_stats_view")
    .select("*")
    .maybeSingle();

  if (error) {
    throw Error(error.message);
  }
  return data as TableSchema;
}
