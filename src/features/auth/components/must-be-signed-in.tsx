"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

import { useEffect, useState } from "react";
import { User } from "../user-schema";
import { fetchUser } from "../fetch-user";

export default function MustBeSignedIn({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserFn = async () => {
      const u = await fetchUser();
      setUser(u);
    };
    fetchUserFn();
  }, []);

  return !user ? (
    <Card className="flex flex-col items-center gap-4 p-6">
      <h1>You must be signed-in to reset your password. </h1>{" "}
      <div className="flex gap-2 justify-center">
        <Link href="/sign-in">
          <Button variant="default">Sign In</Button>
        </Link>
        <Link href="/forgot-password">
          <Button variant="outline">Forgot Password?</Button>
        </Link>{" "}
      </div>
    </Card>
  ) : (
    children
  );
}
