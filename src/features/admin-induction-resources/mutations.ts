"use server";

import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import { UpsertSchema } from "./types";

export async function updateAction({
  slidesToUpsert,
  slidesToDelete,
}: {
  slidesToUpsert: UpsertSchema[];
  slidesToDelete: number[];
}) {
  const supabase = createClientAdmin();

  const { data, error } = await supabase.rpc("manage_induction_resources", {
    p_resources_to_upsert: slidesToUpsert,
    p_resources_to_delete: slidesToDelete,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
