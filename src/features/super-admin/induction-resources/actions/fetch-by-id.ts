"use server";

import { createClient } from "@/utils/supabase/client-server";
import z from "zod";
import { rowSchema } from "../types/row";

export async function fetchById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("induction_resources")
    .select("*")
    .eq("induction_id", id)
    .order("created_at", { ascending: false });

  if (error) {
    throw Error(error.message);
  }

  const parsed = z.array(rowSchema).safeParse(data);
  if (!parsed.success) throw Error(parsed.error.message);

  return parsed.data;
}
