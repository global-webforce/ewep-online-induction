import { AuthRepositoryRemoteServer } from "@/features/auth/shared/repository/auth-repository-remote-server";
import { redirect, RedirectType } from "next/navigation";
import { ReactNode } from "react";
const authRepository = new AuthRepositoryRemoteServer();
export default async function DashboardLayout({
  admin,
  user,
}: {
  admin: ReactNode;
  user: ReactNode;
}) {
  const currentUser = await authRepository.getCurrentUser();

  if (!currentUser) {
    redirect(`/login`, RedirectType.replace);
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      {currentUser.roles.includes("admin") ? admin : user}
    </div>
  );
}
