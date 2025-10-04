"use server";

import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import { TableSchema } from "../types/table";

export async function fetchAll() {
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
