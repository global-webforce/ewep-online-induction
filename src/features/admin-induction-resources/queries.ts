"use server";

import { createClient } from "@/utils/supabase/client-server";
import { TableSchema } from "./types";

export async function getInductionResourcesById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("induction_resources")
    .select("*")
    .eq("induction_id", id)
    .order("created_at", { ascending: false });

  if (error) {
    throw Error(error.message);
  }
  return (data ?? []) as TableSchema[];
}
