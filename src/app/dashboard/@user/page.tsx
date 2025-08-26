import LogoutButtonServer from "@/features/auth/logout/logout-button-server";
import { AuthRepositoryRemoteServer } from "@/features/auth/shared/repository/auth-repository-remote-server";

const authRepository = new AuthRepositoryRemoteServer();

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
