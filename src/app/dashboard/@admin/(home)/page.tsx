import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { authRepository } from "@/features/shared/auth-repository";

export default async function AdminDashboard() {
  const x = await authRepository.getUser();
  return (
    <div className="p-4 flex flex-col gap-4">
      <header className="flex gap-3">
        <SidebarTrigger className="-ml-1" />
        <h1 className="text-xl font-semibold">Dashboardxxx</h1>

        <Button variant="outline" className="ml-auto">
          Quick Add
        </Button>
      </header>

      <main>
        <h1 className="text-lg font-semibold">User Dashboard</h1>
        <p>Welcome, normal user!dd</p>
        <p>{JSON.stringify(x)}</p>
      </main>
    </div>
  );
}
