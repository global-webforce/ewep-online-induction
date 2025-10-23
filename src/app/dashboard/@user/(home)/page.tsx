import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { fetchUser } from "@/features/auth/fetch-user";

import { MetricCardsGridUser } from "@/features/user/home/metric-cards-grid-user";

export default async function Page() {
  const user = await fetchUser();
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
        Welcome! {user?.profile?.first_name || "Admin"}
      </h1>
      <MetricCardsGridUser />
    </div>
  );
}
