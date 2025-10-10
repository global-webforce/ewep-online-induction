"use server";

import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import { inductionWithQuizzesSchema } from "../types/induction-with-quizzes";

export async function fetchInductionAndQuizById(id: string) {
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
     induction_quiz (
      id,
      induction_id,
      question,
      options,
      correct_answer,
      created_at
    )`
    )
    .eq("id", id)
    .single();

  if (error) throw Error(error.message);

  if (data) {
  }
  const parsed = inductionWithQuizzesSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  return parsed.data;
}
