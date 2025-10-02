import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ProfileForm from "@/features/auth/profile/form";
import { requireUser } from "@/features/auth/require-user";

export default async function Profile() {
  const user = await requireUser();
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

      {user && <ProfileForm user={user} />}
    </>
  );
}
