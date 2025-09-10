# TABLES AND RLS POLICY

When creating Table and enabling RLS, you're disabling all possible access to Table, this is where you
create POLICIES e.g. `create policy "Users can read their own profile"`.

POLICIES are especially made for `NON-ADMIN` users.

For Admin users, we can BYPASS all Policies by using `service role key` on Supabase Server Client.

# RAW APP METADATA VS RAW USER METADATA

`App` - this is where highly sensitive user info must be stored e.g. `role`, `premium_user`. We use custom claims on this one.
Link: `https://github.com/supabase-community/supabase-custom-claims`

`User` - info that can updated by user e.g. `profile`, `first_name` , `avatar_url`.
