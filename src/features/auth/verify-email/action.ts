"use server";

import { formatError } from "@/adapters/errors-schema-adapter";
import { getURL } from "@/utils/get-url";
import { createClient } from "@/utils/supabase/client-server";
import z from "zod";

/********************************************************* 
NOTE: Important!
ON Supabase > Authentication > Configuration > Emails > Confirm signup, update the content with this:

<h2>Confirm your signup</h2>

<p>Follow this link to confirm your user:</p>
<p><a href="{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=signup&redirect_to={{ .RedirectTo  }}">Confirm your mail</a></p>

********************************************************/
export async function verifyEmailAction(values: string) {
  try {
    const parsed = z.email().safeParse(values);
    if (parsed.error) {
      throw new Error(z.prettifyError(parsed.error));
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.resend({
      email: values,
      type: "signup",
      options: {
        emailRedirectTo: getURL(),
      },
    });
    if (error) throw formatError(error);
    return { success: true };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: "Unknown error" };
  }
}
