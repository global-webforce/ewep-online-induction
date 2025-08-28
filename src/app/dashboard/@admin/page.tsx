import LogoutButtonServer from "@/features/auth/logout/logout-button";
import { authRepository } from "@/features/auth/shared/repository";

export default async function AdminDashboard() {
  const x = await authRepository.getCurrentUser();
  return (
    <div>
      <h2 className="text-lg font-semibold">Admin Dashboard</h2>
      <p>You have full access.</p>
      <p>{JSON.stringify(x)}</p>
      <LogoutButtonServer />
    </div>
  );
}
