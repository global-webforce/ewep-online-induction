import LogoutButtonServer from "@/features/auth/logout/form";
import { authRepository } from "@/features/shared/repository";

export default async function AdminDashboard() {
  const x = await authRepository.getSession();
  return (
    <div>
      <h2 className="text-lg font-semibold">Admin Dashboard</h2>
      <p>You have full access.</p>
      <p>{JSON.stringify(x)}</p>
      <LogoutButtonServer />
    </div>
  );
}
