"use server";

import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import { TableSchema } from "../types/table";

export async function fetchAll() {
  const supabase = createClientAdmin();
  const { data, error } = await supabase
    .from("metric_cards_super_admin_view")
    .select("*")
    .maybeSingle();

  if (error) {
    throw Error(error.message);
  }
  return data as TableSchema;
}
