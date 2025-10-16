"use server";

import { createClient } from "@/utils/supabase/client-server";

import { sessionUserViewRowSchema } from "@/features/types";
import z from "zod";

export async function fetchAll() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("induction_sessions_user_view")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw Error(error.message);
  }

  if (!data) return null;

  const parsedResult = z.array(sessionUserViewRowSchema).safeParse(data);
  if (parsedResult.error) {
    throw new Error(parsedResult.error.message);
  }

  return parsedResult.data;
}
