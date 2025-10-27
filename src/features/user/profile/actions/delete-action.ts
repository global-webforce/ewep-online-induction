"use server";

import { formatError } from "@/adapters/errors-schema-adapter";
import { createClientAdmin } from "@/utils/supabase/client-server-admin";

export async function deleteAction(id: string) {
  try {
    const supabase = createClientAdmin();

    const { data, error } = await supabase.auth.admin.deleteUser(id);

    if (error) throw formatError(error);

    if (!data) return { data: null };

    return { data: true };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: "Unknown error" };
  }
}
