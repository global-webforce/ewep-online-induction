"use server";

import { createClient } from "@/utils/supabase/client-server";
import { ViewSchema } from "./view";

export async function fetchAll() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("metric_cards_super_admin_view")
    .select("*")
    .single();

  if (error) {
    throw Error(error.message);
  }
  return data as ViewSchema;
}
