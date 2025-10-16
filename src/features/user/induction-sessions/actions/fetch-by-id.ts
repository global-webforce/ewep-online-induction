"use server";

import { sessionUserViewRowSchema } from "@/features/types";
import { createClient } from "@/utils/supabase/client-server";

export async function fetchById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("induction_sessions_user_view")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    throw Error(error.message);
  }

  if (!data) return null;

  const parsedResult = sessionUserViewRowSchema.safeParse(data);
  if (parsedResult.error) {
    throw new Error(parsedResult.error.message);
  }

  return parsedResult.data;
}
