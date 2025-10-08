"use server";

import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import { rowSchema } from "../types/row";

export async function fetchAll() {
  const supabase = createClientAdmin();
  const { data, error } = await supabase
    .from("metric_cards_super_admin_view")
    .select("*")
    .single();

  if (error) {
    throw Error(error.message);
  }

  const parsed = rowSchema.safeParse(data);
  if (!parsed.success) throw Error(parsed.error.message);

  return parsed.data;
}
