"use server";

import { mapError } from "@/adapters/errors-schema-adapter";
import { createClient } from "@/utils/supabase/client-server";
import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import { SignUpInput, signUpInputSchema } from "./schema";

export async function signUpAction(values: SignUpInput) {
  const parsed = signUpInputSchema.safeParse(values);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  const supabase = await createClient();
  const supabaseAdmin = createClientAdmin();

  const { data: email } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("email", values.email)
    .maybeSingle();

  if (email) {
    /* if (!email?.email_confirmed_at) {
        throw mapError(Error("email confirmation required"));
      } */
    throw new Error("A user with this email already exists.");
  }

  const { data, error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
  });

  if (error) throw mapError(error);

  // If confirmation is required, data will have user value and session will be null
  if (!data.user?.email_confirmed_at) {
    throw mapError(Error("email confirmation required"));
  }

  // If confirmation not required, user and session will exist
  if (data.session) {
    console.log(data);
  }
}
