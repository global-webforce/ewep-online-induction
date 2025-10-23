import "server-only";

import { createClient } from "@/utils/supabase/client-server";
import { redirect } from "next/navigation";
import { cache } from "react";
import { mapUser, userSchema } from "../auth-types";

// https://www.youtube.com/watch?v=Eywzqiv29Zk 26:46
// Use to require and use current user on server component, redirect on error;

export const requireUser = cache(async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) redirect("/sign-in");

  if (!data) redirect("/sign-in");

  const parsed = userSchema.safeParse(mapUser(data.user));
  if (parsed.error) {
    throw new Error(parsed.error.message);
  }

  return parsed.data;
});
