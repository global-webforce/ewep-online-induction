import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";

//https://www.reddit.com/r/nextjs/comments/1dq1tc5/comment/laykwhr/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button

type Params = Promise<{ id: string }>;

export default async function DashboardLayout({
  params,
  children,
  slides,
  inductees,
}: {
  params: Params;
  children: ReactNode;
  slides: ReactNode;
  inductees: ReactNode;
}) {
  return (
    <>
      {children}
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Slides</TabsTrigger>
          <TabsTrigger value="password">History</TabsTrigger>
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
