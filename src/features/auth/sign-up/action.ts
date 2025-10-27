"use server";

import { formatError } from "@/adapters/errors-schema-adapter";
import { SignUpInput, signUpInputSchema } from "@/features/auth-types";
import { getURL } from "@/utils/get-url";
import { createClient } from "@/utils/supabase/client-server";
import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import z from "zod";

export async function signUpAction(values: SignUpInput) {
  try {
    const parsed = signUpInputSchema.safeParse(values);
    if (!parsed.success) {
      throw new Error(z.prettifyError(parsed.error));
    }

    const supabase = await createClient();
    const supabaseAdmin = createClientAdmin();

    const { data: user } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("email", values.email)
      .maybeSingle();

    if (user) {
      /* if (!user?.email_confirmed_at) {
        throw formatError(Error("email confirmation required"));
      } */
      throw formatError(Error("A user with this email already exists."));
    }

    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: getURL(),
        data: {
          first_name: values.first_name,
          last_name: values.last_name,
        },
      },
    });

    if (error) throw formatError(error);

    // If confirmation is required, data will have user value and session will be null
    if (data.user?.email_confirmed_at == null) {
      throw formatError(Error("email confirmation required"));
    }

    // If confirmation not required, user and session will exist

    return { success: true };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: "Unknown error" };
  }
}
