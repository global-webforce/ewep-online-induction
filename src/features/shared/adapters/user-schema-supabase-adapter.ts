import { User as SupabaseUser } from "@supabase/supabase-js";
import { User } from "../models/user-schema";

export function userSchemaAdapterSupabase(user: SupabaseUser): User {
  return {
    id: user?.id || "",
    email: user?.email || "",
    app_role: user.app_metadata?.app_role,
    emailConfirmedAt: user?.email_confirmed_at,
    profile: {
      firstName: user?.user_metadata?.firstName || "",
      lastName: user?.user_metadata?.lastName || "",
    },
  };
}
