"use server";

import { createClient } from "@/utils/supabase/client-server";
import { TableSchema } from "../types/table";

export async function fetchAll() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("inductions")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    throw Error(error.message);
  }
  return (data ?? []) as TableSchema[];
}
