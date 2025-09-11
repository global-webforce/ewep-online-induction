import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { authRepository } from "@/features/shared/auth-repository";
import { redirect, RedirectType } from "next/navigation";
import { ReactNode } from "react";
import SideBarAdmin from "./@admin/_components/sidebar";

export default async function DashboardLayout({
  admin,
  user,
}: {
  admin: ReactNode;
  user: ReactNode;
}) {
  const currentUser = await authRepository.getUser();

  if (!currentUser) {
    redirect("/sign-in", RedirectType.replace);
  }

  return (
    <SidebarProvider>
      <SideBarAdmin />
      <SidebarInset>
        <div className="min-h-screen">
          <div>{currentUser.roles.includes("Admin") ? admin : user}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
