import "client-only";

import { mapUser } from "@/adapters/user-schema-adapter";
import { createClient } from "@/utils/supabase/client-browser";
import { cache } from "react";

/***********************************
https://www.youtube.com/watch?v=Eywzqiv29Zk 26:46
cache - scoped to only 1 render pass, good for repeatedly called requests.
************************************/
export const fetchUserClient = cache(async () => {
  // await new Promise((resolve) => setTimeout(resolve, 2_000));
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return mapUser(data.user);
});
