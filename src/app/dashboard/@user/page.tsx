import { SidebarTrigger } from "@/components/ui/sidebar";
import LogoutButtonServer from "@/features/auth/sign-out/ui";
import { authRepository } from "@/features/shared/auth-repository";

export default async function UserDashboard() {
  const x = await authRepository.getUser();
  return (
    <div>
      <header className="flex gap-4">
        <SidebarTrigger className="-ml-1" />
        <h2 className="text-lg font-semibold">Dashboard</h2>
      </header>

      <h2 className="text-lg font-semibold">User Dashboard</h2>
      <p>Welcome, normal user!</p>
      <p>{JSON.stringify(x)}</p>
      <LogoutButtonServer />
    </div>
  );
}
