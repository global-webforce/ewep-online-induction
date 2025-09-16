import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { authRepository } from "@/features/shared/auth-repository";
import { redirect, RedirectType } from "next/navigation";
import { ReactNode } from "react";
import SideBarAdmin from "./@admin/sidebar-admin";
import SideBarDefault from "./@user/sidebar-default";

export default async function DashboardLayout({
  admin,
  user,
}: {
  admin: ReactNode;
  user: ReactNode;
}) {
  const currentUser = await authRepository.getUser();

  if (!currentUser) {
    console.log("No user, redirecting to sign-in");
    redirect("/sign-in", RedirectType.replace);
  }
  return (
    <SidebarProvider>
      {currentUser.app_role == "super_admin" ? (
        <SideBarAdmin user={currentUser} />
      ) : (
        <SideBarDefault user={currentUser} />
      )}
      <SidebarInset>
        <div className="min-h-screen">
          <div>{currentUser.app_role == "super_admin" ? admin : user}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
