"use server";

import { inductionUserViewRowSchema } from "@/features/types";
import { createClient } from "@/utils/supabase/client-server";

export async function fetchById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("inductions_user_view")
    .select("*")
    .eq("status", "published")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    throw Error(error.message);
  }

  if (!data) return null;

  const parsedResult = inductionUserViewRowSchema.safeParse(data);
  if (parsedResult.error) {
    throw new Error(parsedResult.error.message);
  }

  return parsedResult.data;
}
