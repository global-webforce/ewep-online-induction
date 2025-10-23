"use server";

import { SuperAdmin__MetricsSchema } from "@/features/types";
import { createClientAdmin } from "@/utils/supabase/client-server-admin";

export async function fetchAll() {
  const supabase = createClientAdmin();
  const { data, error } = await supabase
    .from("metric_cards_super_admin_view")
    .select("*")
    .single();

  if (error) {
    throw Error(error.message);
  }

  const parsed = SuperAdmin__MetricsSchema.safeParse(data);
  if (parsed.error) throw Error(parsed.error.message);

  return parsed.data;
}
