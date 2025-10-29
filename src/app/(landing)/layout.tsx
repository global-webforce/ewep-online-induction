import { fetchUser } from "@/features/auth/fetch-user";
import LayoutMain from "../layout-main";
export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await fetchUser();
  return <LayoutMain hasUser={user != null}>{children}</LayoutMain>;
}
