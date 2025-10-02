import { BackButton } from "@/components/custom/back-button";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default async function UserDashboard({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="p-4 h-full">{children}</div>;
}
