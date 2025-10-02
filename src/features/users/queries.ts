"use server";

import { createClient } from "@/utils/supabase/client-server";
import { TableSchema } from "./types";
import { createClientAdmin } from "@/utils/supabase/client-server-admin";

export async function getAll() {
  const supabase = createClientAdmin();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    throw Error(error.message);
  }
  return (data ?? []) as TableSchema[];
}

export async function getById(id: string) {
  //await new Promise((resolve) => setTimeout(resolve, 20_000));
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
