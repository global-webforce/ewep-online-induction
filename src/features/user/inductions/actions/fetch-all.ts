"use server";

import { formatError } from "@/adapters/errors-schema-adapter";
import { inductionUserViewRowSchema } from "@/features/types";
import { createClient } from "@/utils/supabase/client-server";
import z from "zod";

export async function fetchAll() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("inductions_user_view")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (error) throw formatError(error);

    if (!data) return { data: null };

    const parsedResult = z.array(inductionUserViewRowSchema).safeParse(data);
    if (parsedResult.error) {
      throw new Error(z.prettifyError(parsedResult.error));
    }

    return { data: parsedResult.data };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: "Unknown error" };
  }
}
