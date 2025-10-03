import { ReactNode } from "react";

export default async function UserDashboard({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="p-4 h-full">{children}</div>;
}
