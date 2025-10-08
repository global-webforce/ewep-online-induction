import { User } from "@/features/auth/user-schema";
import { User as SupabaseUser } from "@supabase/supabase-js";

export function mapUser(user: SupabaseUser): User {
  return {
    id: user.id,
    email: user.email!,
    app_role: user.app_metadata.app_role,
    confirmed_at: user?.confirmed_at || null,
    profile: {
      first_name: user?.user_metadata?.first_name || "",
      last_name: user?.user_metadata?.last_name || "",
    },
  };
}
