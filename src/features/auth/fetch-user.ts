import "client-only";

import { mapUser } from "@/adapters/user-schema-adapter";
import { createClient } from "@/utils/supabase/client-browser";
import { cache } from "react";

// https://www.youtube.com/watch?v=Eywzqiv29Zk 26:46
// Use to get current user on client component, no redirect on error;

export const fetchUser = cache(async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return mapUser(data.user);
});
