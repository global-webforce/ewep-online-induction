import LogoutButtonServer from "@/features/auth/sign-out/ui";
import { authRepository } from "@/features/shared/auth-repository";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export default async function Profile() {
  const x = await authRepository.getUser();
  return (
    <div className="p-4 flex flex-col gap-4">
      <header className="flex gap-3">
        <SidebarTrigger className="-ml-1" />
        <h1 className="text-xl font-semibold">Profile</h1>

        <Button variant="outline" className="ml-auto">
          Quick Add
        </Button>
      </header>

      <main>
        <h1 className="text-lg font-semibold">User Dashboard</h1>
        <p>Welcome, normal user!dd</p>
        <p>{JSON.stringify(x)}</p>
        <LogoutButtonServer />
      </main>
    </div>
  );
}
