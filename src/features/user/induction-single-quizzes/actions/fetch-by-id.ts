"use server";

import { quizRowSchema } from "@/features/types";
import { createClient } from "@/utils/supabase/client-server";
import z from "zod";

export async function fetchById(induction_id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("induction_quiz")
    .select("*")
    .eq("induction_id", induction_id);

  if (error) throw Error(error.message);

  if (!data) return null;

  const parsed = z.array(quizRowSchema).safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  return parsed.data;
}
