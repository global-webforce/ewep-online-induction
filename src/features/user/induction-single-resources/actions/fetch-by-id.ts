"use server";

import { resourceRowSchema } from "@/features/types";
import { createClient } from "@/utils/supabase/client-server";
import z from "zod";

export async function fetchById(induction_id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("induction_resources")
    .select("*")
    .eq("induction_id", induction_id);

  if (error) {
    throw Error(error.message);
  }

  if (!data) return null;

  const parsedResult = z.array(resourceRowSchema).safeParse(data);
  if (parsedResult.error) {
    throw new Error(parsedResult.error.message);
  }

  return parsedResult.data;
}
