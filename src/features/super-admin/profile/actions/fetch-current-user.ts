import { formatError } from "@/adapters/errors-schema-adapter";
import { mapUser } from "@/features/auth-types";
import { createClient } from "@/utils/supabase/client-browser";
import { cache } from "react";
import z from "zod";
import { rowSchema } from "../constants";

export const fetchCurrentUser = cache(async () => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) throw formatError(error);

    if (!data) return { data: null };

    const parsedResult = rowSchema.safeParse(mapUser(data.user));
    if (parsedResult.error) {
      throw new Error(z.prettifyError(parsedResult.error));
    }

    return { data: parsedResult.data };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: "Unknown error" };
  }
});
