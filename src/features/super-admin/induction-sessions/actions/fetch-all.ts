"use server";

import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import { RowSchema } from "../types/row";

export async function fetchAll() {
  const supabase = createClientAdmin();
  const { data, error } = await supabase
    .from("induction_sessions_super_admin_view")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw Error(error.message);
  }
  return (data ?? []) as RowSchema[];
}
