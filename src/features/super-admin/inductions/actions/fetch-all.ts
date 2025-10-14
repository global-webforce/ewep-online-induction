"use server";

import { inductionTableSchema } from "@/features/types";
import { createClientAdmin } from "@/utils/supabase/client-server-admin";

export async function fetchAll() {
  const supabase = createClientAdmin();
  const { data, error } = await supabase
    .from("inductions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw Error(error.message);
  }

  if (!data) return null;

  const parsedResult = inductionTableSchema.safeParse(data);
  if (parsedResult.error) {
    throw new Error(parsedResult.error.message);
  }

  return parsedResult.data;
}
