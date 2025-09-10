import LogoutButtonServer from "@/features/auth/sign-out/ui";
import { authRepository } from "@/features/shared/auth-repository";

export default async function UserDashboard() {
  const x = await authRepository.getSession();
  return (
    <div>
      <h2 className="text-lg font-semibold">User Dashboard</h2>
      <p>Welcome, normal user!</p>
      <p>{JSON.stringify(x)}</p>
      <LogoutButtonServer />
    </div>
  );
}
