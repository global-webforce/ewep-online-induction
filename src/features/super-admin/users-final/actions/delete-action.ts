"use server";

import { createClientAdmin } from "@/utils/supabase/client-server-admin";

export async function deleteAction(id: string) {
  const supabase = createClientAdmin();

  const { data, error } = await supabase.auth.admin.deleteUser(id);

  if (error) {
    throw new Error(error.message);
  }

  if (!data) return null;
}
