"use server";

import { inductionUserViewRowSchema } from "@/features/types";
import { createClient } from "@/utils/supabase/client-server";
import z from "zod";

export async function fetchAll() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("inductions_user_view")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    throw Error(error.message);
  }

  if (!data) return null;

  const parsedResult = z.array(inductionUserViewRowSchema).safeParse(data);
  if (parsedResult.error) {
    throw new Error(parsedResult.error.message);
  }

  return parsedResult.data;
}
