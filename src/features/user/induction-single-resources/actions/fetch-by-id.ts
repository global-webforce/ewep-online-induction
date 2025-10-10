"use server";

import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import { inductionWithResourcesSchema } from "../types/view";

export async function fetchById(id: string) {
  const supabase = createClientAdmin();
  const { data, error } = await supabase
    .from("induction_single_resources_user_view")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw Error(error.message);

  if (data) {
  }
  const parsed = inductionWithResourcesSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  return parsed.data;
}
