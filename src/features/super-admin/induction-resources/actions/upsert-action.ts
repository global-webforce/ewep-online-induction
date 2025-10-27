"use server";

import { formatError } from "@/adapters/errors-schema-adapter";
import { ResourcesUpsertSchema } from "@/features/types";
import { createClientAdmin } from "@/utils/supabase/client-server-admin";

export async function upsertAction(value: ResourcesUpsertSchema) {
  const supabase = createClientAdmin();

  const { data, error } = await supabase.rpc("manage_induction_resources", {
    p_resources_to_upsert: value.slides_to_upsert,
    p_resources_to_delete: value.slides_to_delete,
  });

  if (error) throw formatError(error);

  return data;
}
