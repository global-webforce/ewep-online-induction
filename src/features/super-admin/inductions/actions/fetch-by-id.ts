"use server";

import { formatError } from "@/adapters/errors-schema-adapter";
import { inductionRowSchema } from "@/features/types";
import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import z from "zod";

export async function fetchById(id: string) {
  try {
    const supabase = createClientAdmin();
    const { data, error } = await supabase
      .from("inductions")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw formatError(error);

    if (!data) return { data: null };

    const parsedResult = inductionRowSchema.safeParse(data);
    if (parsedResult.error) {
      throw new Error(z.prettifyError(parsedResult.error));
    }

    return { data: parsedResult.data };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: "Unknown error" };
  }
}
