import "server-only";

import { mapUser } from "@/adapters/user-schema-adapter";
import { createClient } from "@/utils/supabase/client-server";
import { redirect } from "next/navigation";
import { cache } from "react";

/***********************************
https://www.youtube.com/watch?v=Eywzqiv29Zk 26:46
cache - scoped to only 1 render pass, good for repeatedly called requests.
************************************/
export const requireUser = cache(async () => {
  // await new Promise((resolve) => setTimeout(resolve, 2_000));
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) redirect("/sign-in");
  return mapUser(data.user);
});
