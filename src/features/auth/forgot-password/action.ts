"use server";

import { formatError } from "@/adapters/errors-schema-adapter";
import { EmailInput, emailInputSchema } from "@/features/auth-types";
import { getURL } from "@/utils/get-url";
import { createClient } from "@/utils/supabase/client-server";

/*****************************************************
 * 
NOTE: Important!
ON Supabase > Authentication > Configuration > Emails > Recovery, update the content with this:

<h2>Reset Password</h2>

<p>Follow this link to reset the password for your user:</p>
<p><a href="{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=recovery&redirect_to={{ .RedirectTo  }}">Reset Password</a></p>

****************************************************/

export async function forgotPasswordAction(values: EmailInput) {
  try {
    const parsed = emailInputSchema.safeParse(values);
    if (!parsed.success) {
      throw new Error(parsed.error.message);
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(
      parsed.data.email,
      {
        redirectTo: getURL(),
      }
    );
    if (error) throw formatError(error);
    return { success: true };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: "Unknown error" };
  }
}
