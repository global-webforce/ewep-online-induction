import { authRepository } from "@/features/shared/repository";
import { redirect, RedirectType } from "next/navigation";
import { ReactNode } from "react";

export default async function DashboardLayout({
  admin,
  user,
}: {
  admin: ReactNode;
  user: ReactNode;
}) {
  const currentUser = await authRepository.getSession();

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
