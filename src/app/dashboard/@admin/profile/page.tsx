import { mapUser } from "@/adapters/user-schema-adapter";
import ProfileForm from "@/features/auth/profile/form";

import { createClient } from "@/utils/supabase/client-server";
import { redirect } from "next/navigation";

export default async function Profile() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) redirect("/signIn");

  const user = mapUser(data.user);

  return (
    <main>
      <ProfileForm data={user} />
    </main>
  );
}
