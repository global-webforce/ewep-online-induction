import { mapUser } from "@/adapters/user-schema-adapter";
import { createClient } from "@/utils/supabase/client-browser";
import { redirect } from "next/navigation";

/***********************************
https://www.youtube.com/watch?v=Eywzqiv29Zk | 32:49
When getting user on Layout DO NOT fetch the user on server side, 
this will lead to children layout to be dynamic and that is bad. For this, we use supabase client browser
************************************/
export async function requireUserClient() {
  // await new Promise((resolve) => setTimeout(resolve, 2_000));
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) redirect("/sign-in");
  return mapUser(data.user);
}
