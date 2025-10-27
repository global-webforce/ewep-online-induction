"use server";

import { formatError } from "@/adapters/errors-schema-adapter";
import { inductionFormSchema, InductionFormSchema } from "@/features/types";
import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import z from "zod";

export async function updateAction(id: string, values: InductionFormSchema) {
  try {
    const parsedValue = inductionFormSchema.safeParse(values);
    if (parsedValue.error) {
      throw new Error(z.prettifyError(parsedValue.error));
    }
    const supabase = createClientAdmin();
    const { data, error } = await supabase
      .from("inductions")
      .update(parsedValue.data)
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) throw formatError(error);

    if (!data) return { data: null };

    const parsedResult = inductionFormSchema.safeParse(data);
    if (parsedResult.error) {
      throw new Error(z.prettifyError(parsedResult.error));
    }

    return { data: parsedResult.data };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: "Unknown error" };
  }
}
