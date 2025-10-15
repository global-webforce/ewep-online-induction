"use server";

import {
  QuizFormSchema,
  quizFormSchema,
  quizRowSchema,
} from "@/features/types";
import { createClientAdmin } from "@/utils/supabase/client-server-admin";

export async function createAction(values: QuizFormSchema) {
  const parsedValue = quizFormSchema.safeParse(values);
  if (parsedValue.error) {
    throw new Error(parsedValue.error.message);
  }
  const supabase = createClientAdmin();
  const { data, error } = await supabase
    .from("induction_quiz")
    .insert(parsedValue.data)
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
