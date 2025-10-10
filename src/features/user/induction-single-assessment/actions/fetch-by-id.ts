"use server";

import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import { inductionWithQuizzesSchema } from "../types/view";

export async function fetchById(id: string) {
  const supabase = createClientAdmin();
  const { data, error } = await supabase
    .from("induction_single_quizzes_user_view")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw Error(error.message);

  const parsed = inductionWithQuizzesSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  return parsed.data;
}
