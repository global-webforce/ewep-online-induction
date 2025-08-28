import LogoutButtonServer from "@/features/auth/logout/logout-button";
import { authRepository } from "@/features/auth/shared/repository";

export default async function UserDashboard() {
  const x = await authRepository.getCurrentUser();
  return (
    <div>
      <h2 className="text-lg font-semibold">User Dashboard</h2>
      <p>Welcome, normal user!</p>
      <p>{JSON.stringify(x)}</p>
      <LogoutButtonServer />
    </div>
  );
}
