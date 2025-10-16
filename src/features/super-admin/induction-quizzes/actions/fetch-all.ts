"use server";

import { quizRowSchema } from "@/features/types";
import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import z from "zod";

export async function fetchAll(id: string) {
  const supabase = createClientAdmin();
  const { data, error } = await supabase
    .from("induction_quiz")
    .select("*")
    .eq("induction_id", id)
    .order("created_at", { ascending: false });

  if (error) {
    throw Error(error.message);
  }

  if (!data) return null;

  const parsedResult = z.array(quizRowSchema).safeParse(data);
  if (parsedResult.error) {
    throw new Error(parsedResult.error.message);
  }

  return parsedResult.data;
}
