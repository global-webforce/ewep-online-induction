# TABLES AND RLS POLICY

When creating Table and enabling RLS, you're disabling all possible access to Table, this is where you
create POLICIES e.g. `create policy "Users can read their own profile"`.

POLICIES are especially made for `NON-ADMIN` users.

For Admin users, we can BYPASS all Policies by using `service role key` on Supabase Server Client.

# RAW APP METADATA VS RAW USER METADATA

`App` - this is where highly sensitive user info must be stored e.g. `role`, `premium_user`. We use custom claims on this one.
Link: `https://github.com/supabase-community/supabase-custom-claims`

`User` - info that can updated by user e.g. `profile`, `first_name` , `avatar_url`.
Note: You can also put `role` here BUT (Not trusted for authorization, just for queries/UI only)
Link: `https://nocodegarden.io/blog/creating-user-profiles-on-sign-up-in-supabase`

# EXPOSING AUTH TABLE TO PUBLIC (GAME CHANGE HACK)

## We convert auth table to a view!!!

https://github.com/supabase/auth-js/issues/359

# only run revoke all on public.users from anon; for allow the access only to auth users
