"use server";

import { createClient } from "@/utils/supabase/client-server";

import { sessionRowViewSchema } from "@/features/types";
import z from "zod";

export async function fetchAll() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("induction_sessions_view")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw Error(error.message);
  }

  if (!data) return null;

  const parsedResult = z.array(sessionRowViewSchema).safeParse(data);
  if (parsedResult.error) {
    throw new Error(parsedResult.error.message);
  }

  return parsedResult.data;
}
