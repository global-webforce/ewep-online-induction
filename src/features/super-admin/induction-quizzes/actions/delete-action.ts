"use server";

import { quizRowSchema } from "@/features/types";
import { createClientAdmin } from "@/utils/supabase/client-server-admin";

export async function deleteAction(id: string) {
  const supabase = createClientAdmin();

  const { data, error } = await supabase
    .from("induction_quiz")
    .delete()
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) return null;

  const parsedResult = quizRowSchema.safeParse(data);
  if (parsedResult.error) {
    throw new Error(parsedResult.error.message);
  }

  return parsedResult.data;
}
