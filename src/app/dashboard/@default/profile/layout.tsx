import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { ReactNode } from "react";

export default async function UserDashboard({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="p-4 h-screen flex flex-col gap-3 ">
      <header className="flex gap-3 h-8">
        <SidebarTrigger className="-ml-1" />
        <h1 className="text-xl font-semibold">Profile</h1>
      </header>
      {children}
    </div>
  );
}
