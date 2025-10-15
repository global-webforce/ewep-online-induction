"use server";

import { resourceRowSchema } from "@/features/types";
import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import z from "zod";

export async function fetchById(id: string) {
  const supabase = createClientAdmin();
  const { data, error } = await supabase
    .from("induction_resources")
    .select("*")
    .eq("induction_id", id);

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
