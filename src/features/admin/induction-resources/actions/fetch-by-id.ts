"use server";

import { createClient } from "@/utils/supabase/client-server";
import { TableSchema } from "../types/table";

export async function fetchById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("induction_resources")
    .select("*")
    .eq("induction_id", id)
    .order("created_at", { ascending: false });

  /* const { data, error } = await supabase
    .from("inductions")
    .select(
      `
    id,
    title,
    description,
    validity_days,
    status,
    created_at,
    induction_resources (
      id,
      title,
      content,
      "order",
      quiz,
      created_at
    )
  `
    )
    .eq("id", id)
    .order("order", { referencedTable: "induction_resources", ascending: true })
    .maybeSingle();
 */
  if (error) {
    throw Error(error.message);
  }
  return (data ?? []) as TableSchema[];
}
