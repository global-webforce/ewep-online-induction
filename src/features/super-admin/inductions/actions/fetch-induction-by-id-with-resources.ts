"use server";

import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import { inductionWithResourcesSchema } from "../types/induction-with-resources";

export async function fetchInductionResourcesById(id: string) {
  const supabase = createClientAdmin();
  const { data, error } = await supabase
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
      induction_id,
      title,
      content,
      "order",
      quiz,
      created_at
    )`
    )
    .eq("id", id)
    .order("order", { referencedTable: "induction_resources", ascending: true })
    .maybeSingle();

  if (error) throw Error(error.message);

  const parsed = inductionWithResourcesSchema.safeParse(data);
  if (!parsed.success) {
    console.error(JSON.stringify(parsed.error.message));
    throw new Error("fetchInductionResourcesById : Error parsing data");
  }

  return parsed.data;
}
