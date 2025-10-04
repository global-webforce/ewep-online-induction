import "server-only";

import { mapUser } from "@/adapters/user-schema-adapter";
import { createClient } from "@/utils/supabase/client-server";
import { redirect } from "next/navigation";
import { cache } from "react";

// https://www.youtube.com/watch?v=Eywzqiv29Zk 26:46
// Use to require and use current user on server component, redirect on error;

export const requireUser = cache(async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) redirect("/sign-in");
  return mapUser(data.user);
});
