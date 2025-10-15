"use server";

import { inductionRowSchema } from "@/features/types";
import { createClientAdmin } from "@/utils/supabase/client-server-admin";

export async function deleteAction(id: string) {
  const supabase = createClientAdmin();

  const { data, error } = await supabase
    .from("inductions")
    .delete()
    .eq("id", id)
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
