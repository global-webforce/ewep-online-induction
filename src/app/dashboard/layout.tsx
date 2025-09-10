import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { authRepository } from "@/features/shared/auth-repository";
import { redirect, RedirectType } from "next/navigation";
import { ReactNode } from "react";
import SidebarDashboard from "./@admin/sidebar";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "sonner";

export default async function DashboardLayout({
  admin,
  user,
}: {
  admin: ReactNode;
  user: ReactNode;
}) {
  const currentUser = await authRepository.getSession();

  if (!currentUser) {
    redirect("/sign-in", RedirectType.replace);
  }

  return (
    <SidebarProvider>
      <SidebarDashboard
        user={{
          id: "",
          email: undefined,
        }}
      />
      <SidebarInset style={{ margin: 0, padding: 0 }}>
        <div className="min-h-screen p-4">
          <div className="flex items-start justify-start ">
            {
              <header className="flex  shrink-0 items-center gap-2 py-4 align-middle justify-center">
                <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />
                </div>
                <h1 className="text-xl font-bold mb-0">Dashboard</h1>
              </header>
            }
          </div>
          <div className="flex flex-1 flex-col gap-4 ">
            <Toaster position="top-right" />
            {currentUser.roles.includes("admin") ? admin : user}
          </div>{" "}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
