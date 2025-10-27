"use server";

import { formatError } from "@/adapters/errors-schema-adapter";
import {
  quizFormSchema,
  QuizFormSchema,
  quizRowSchema,
} from "@/features/types";
import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import z from "zod";

export async function updateAction(id: string, values: QuizFormSchema) {
  try {
    const parsedValue = quizFormSchema.safeParse(values);
    if (parsedValue.error) {
      throw new Error(z.prettifyError(parsedValue.error));
    }
    const supabase = createClientAdmin();
    const { data, error } = await supabase
      .from("induction_quiz")
      .update(parsedValue.data)
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) throw formatError(error);

    if (!data) return { data: null };

    const parsedResult = quizRowSchema.safeParse(data);
    if (parsedResult.error) {
      throw new Error(z.prettifyError(parsedResult.error));
    }

    return { data: parsedResult.data };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: "Unknown error" };
  }
}
