"use server";

import { formatError } from "@/adapters/errors-schema-adapter";
import { quizRowSchema } from "@/features/types";
import { createClient } from "@/utils/supabase/client-server";
import z from "zod";

export async function fetchById(induction_id: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("induction_quiz")
      .select("*")
      .eq("induction_id", induction_id);

    if (error) throw formatError(error);

    if (!data) return { data: null };

    const parsedResult = z.array(quizRowSchema).safeParse(data);
    if (parsedResult.error) {
      throw new Error(z.prettifyError(parsedResult.error));
    }

    return { data: parsedResult.data };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: "Unknown error" };
  }
}
