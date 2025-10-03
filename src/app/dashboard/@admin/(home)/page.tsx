import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AdminStats from "@/features/admin-stats/admin-stats";
import { requireUser } from "@/features/auth/require-user";

export default async function Page() {
  const user = await requireUser();
  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <div className="space-x-2">
          <Button asChild variant="outline" size="icon">
            <SidebarTrigger />
          </Button>
        </div>
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>

      <h1 className="text-xl font-semibold">
        Welcome! {user.profile?.first_name || "Admin"}
      </h1>
      <AdminStats />
    </div>
  );
}
