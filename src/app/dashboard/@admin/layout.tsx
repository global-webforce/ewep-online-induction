import { BackButton } from "@/components/custom/back-button";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default async function UserDashboard({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="p-4 h-screen flex flex-col gap-3">
      <header className="flex gap-2 pb-2">
        <Button asChild variant="outline" size="icon">
          <SidebarTrigger className="-ml-1" />
        </Button>
        <BackButton />
      </header>
      {children}
    </div>
  );
}
