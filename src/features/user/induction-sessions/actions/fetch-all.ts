"use server";

import { createClient } from "@/utils/supabase/client-server";

import { formatError } from "@/adapters/errors-schema-adapter";
import { sessionRowViewSchema } from "@/features/types";
import z from "zod";

export async function fetchAll() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("induction_sessions_view")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw formatError(error);

    if (!data) return { data: null };

    const parsedResult = z.array(sessionRowViewSchema).safeParse(data);
    if (parsedResult.error) {
      throw new Error(z.prettifyError(parsedResult.error));
    }

    return { data: parsedResult.data };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: "Unknown error" };
  }
}
