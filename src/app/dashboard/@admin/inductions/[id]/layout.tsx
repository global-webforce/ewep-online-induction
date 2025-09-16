import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";

//https://www.reddit.com/r/nextjs/comments/1dq1tc5/comment/laykwhr/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button

export default function DashboardLayout({
  params,
  children,
  slides,
  inductees,
}: {
  params: { id: string };
  children: ReactNode;
  slides: ReactNode;
  inductees: ReactNode;
}) {
  return (
    <>
      {JSON.stringify(params)}
      {children}
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>{slides}</Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>{inductees}</Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
