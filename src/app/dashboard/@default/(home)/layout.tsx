import { SidebarTrigger } from "@/components/ui/sidebar";

import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="p-4  flex flex-col gap-3 h-screen">
      <header className="flex gap-3">
        <SidebarTrigger className="-ml-1" />
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </header>
      {children}
    </div>
  );
}
