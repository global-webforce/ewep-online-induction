"use server";

import { user__RowViewSchema } from "@/features/auth-types";
import { createClientAdmin } from "@/utils/supabase/client-server-admin";

export async function fetchById(id: string) {
  const supabase = createClientAdmin();
  const { data, error } = await supabase
    .from("users_view")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    throw Error(error.message);
  }

  if (!data) return null;

  const parsedResult = user__RowViewSchema.safeParse(data);
  if (parsedResult.error) {
    throw new Error(parsedResult.error.message);
  }

  return parsedResult.data;
}
