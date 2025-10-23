import { SidebarProvider } from "@/components/ui/sidebar";
import { fetchUser } from "@/features/auth/fetch-user";
import { redirect, RedirectType } from "next/navigation";
import { ReactNode } from "react";
import SideBarAdmin from "../../components/dashboard-layout/sidebar-admin";
import SideBarDefault from "../../components/dashboard-layout/sidebar-user";

export default async function DashboardLayout({
  admin,
  user,
}: {
  admin: ReactNode;
  user: ReactNode;
}) {
  const currentUser = await fetchUser();

  if (!currentUser) {
    console.log("No user, redirecting to sign-in");
    redirect("/sign-in", RedirectType.replace);
  }
  return (
    <SidebarProvider>
      {currentUser.app_role == "super_admin" && <SideBarAdmin />}

      {currentUser.app_role == "user" && <SideBarDefault />}

      <div className="bg-background w-full min-h-screen">
        {currentUser.app_role == "super_admin" && admin}
        {currentUser.app_role == "user" && user}
      </div>
    </SidebarProvider>
  );
}
