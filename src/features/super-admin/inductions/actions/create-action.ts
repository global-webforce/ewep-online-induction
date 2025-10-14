"use server";

import {
  inductionFormSchema,
  InductionFormSchema,
  inductionRowSchema,
} from "@/features/types";
import { createClientAdmin } from "@/utils/supabase/client-server-admin";

export async function createAction(values: InductionFormSchema) {
  const parsedValue = inductionFormSchema.safeParse(values);
  if (parsedValue.error) {
    throw new Error(parsedValue.error.message);
  }
  const supabase = createClientAdmin();
  const { data, error } = await supabase
    .from("inductions")
    .insert(parsedValue.data)
    .select()
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) return null;

  const parsedResult = inductionRowSchema.safeParse(data);
  if (parsedResult.error) {
    throw new Error(parsedResult.error.message);
  }

  return parsedResult.data;
}
