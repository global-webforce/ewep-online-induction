"use server";

import { createClient } from "@/utils/supabase/client-server";
import { TableSchema } from "./types";

export async function getAll() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("inductions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw Error(error.message);
  }
  return (data ?? []) as TableSchema[];
}

export async function getById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("inductions")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw Error(error.message);
  }

  return (data || undefined) as TableSchema | undefined;
}
