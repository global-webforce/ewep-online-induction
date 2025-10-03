"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchUserClient } from "../fetch-user-client";
import { useEffect, useState } from "react";
import { User } from "../user-schema";

export function AuthGroupButtons() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const u = await fetchUserClient();
      setUser(u);
    };
    fetchUser();
  }, []);
  return (
    <div className="flex items-center">
      {!user && ( // show signIn/register if NOT logged in
        <div className="flex gap-2 justify-center">
          <Link href="/sign-in">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link href="/sign-up">
            <Button variant="default">Sign Up</Button>
          </Link>
        </div>
      )}
      {user && ( // show dashboard if logged in
        <div className="flex gap-2 justify-end">
          <Link href="/dashboard">
            <Button variant="default">Go to Dashboard</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
