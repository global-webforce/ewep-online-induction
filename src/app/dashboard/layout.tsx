import { SidebarProvider } from "@/components/ui/sidebar";
import { redirect, RedirectType } from "next/navigation";
import { ReactNode } from "react";
import SideBarAdmin from "../../components/dashboard-layout/sidebar-admin";
import SideBarDefault from "../../components/dashboard-layout/sidebar-default";
import { requireUserClient } from "@/features/auth/require-user-client";
import { requireUser } from "@/features/auth/require-user";

export default async function DashboardLayout({
  admin,
  user,
}: {
  admin: ReactNode;
  user: ReactNode;
}) {
  const currentUser = await requireUser();

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

      <div className="bg-background w-full min-h-screen">
        {currentUser.app_role == "super_admin" ? admin : user}
      </div>
    </SidebarProvider>
  );
}
