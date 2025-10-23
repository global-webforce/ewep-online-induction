import "server-only";

import { createClient } from "@/utils/supabase/client-server";
import { cache } from "react";
import { mapUser, userSchema } from "../auth-types";

export const fetchUser = cache(async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;

  if (!data) return null;

  const parsed = userSchema.safeParse(mapUser(data.user));
  if (parsed.error) {
    throw new Error(parsed.error.message);
  }

  return parsed.data;
});
