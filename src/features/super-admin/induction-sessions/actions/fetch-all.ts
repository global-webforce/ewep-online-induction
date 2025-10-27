"use server";

import { sessionRowViewSchema } from "@/features/types";
import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import z from "zod";

export async function fetchAll() {
  try {
    const supabase = createClientAdmin();
    const { data, error } = await supabase
      .from("induction_sessions_view")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw Error(error.message);
    }

    if (!data) return { data: null };

    const parsedResult = z.array(sessionRowViewSchema).safeParse(data);
    if (parsedResult.error) {
      throw new Error(parsedResult.error.message);
    }

    return { data: parsedResult.data };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: "Unknown error" };
  }
}
