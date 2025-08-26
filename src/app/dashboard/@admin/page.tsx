import LogoutButtonServer from "@/features/auth/logout/logout-button-server";
import { AuthRepositoryRemoteServer } from "@/features/auth/shared/repository/auth-repository-remote-server";

const authRepository = new AuthRepositoryRemoteServer();

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
