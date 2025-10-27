"use server";

import { formatError } from "@/adapters/errors-schema-adapter";
import { SuperAdmin__MetricsSchema } from "@/features/types";
import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import z from "zod";

export async function fetchAll() {
  try {
    const supabase = createClientAdmin();
    const { data, error } = await supabase
      .from("metric_cards_super_admin_view")
      .select("*")
      .single();

    if (error) throw formatError(error);

    const parsed = SuperAdmin__MetricsSchema.safeParse(data);
    if (parsed.error) throw new Error(z.prettifyError(parsed.error));

    return { data: parsed.data };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: "Unknown error" };
  }
}
