"use server";

import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import { TableSchema } from "../types/table";

export async function fetchById(id: string) {
  const supabase = await createClientAdmin();
  const { data, error } = await supabase
    .from("induction_sessions_super_admin_view")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    throw Error(error.message);
  }

  return (data || undefined) as TableSchema | undefined;
}
