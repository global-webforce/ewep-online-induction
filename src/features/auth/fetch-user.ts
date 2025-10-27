import "server-only";

import { createClient } from "@/utils/supabase/client-server";
import { cache } from "react";
import z from "zod";
import { mapUser, userRowViewSchema } from "../auth-types";

export const fetchUser = cache(async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;

  if (!data) return null;

  const parsed = userRowViewSchema.safeParse(mapUser(data.user));
  if (parsed.error) {
    throw new Error(z.prettifyError(parsed.error));
  }

  return parsed.data;
});
