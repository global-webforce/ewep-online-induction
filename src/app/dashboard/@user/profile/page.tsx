import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { fetchUser } from "@/features/auth/fetch-user";
import __UserProfileForm from "@/features/user/profile/form";

export default async function Page() {
  const user = await fetchUser();
  return (
    <>
      <div className="flex gap-4 items-center mb-4">
        <div className="space-x-2">
          <Button asChild variant="outline" size="icon">
            <SidebarTrigger />
          </Button>
        </div>
        <h1 className="text-xl font-semibold">Profile</h1>
      </div>

      {user && <__UserProfileForm user={user} />}
    </>
  );
}
