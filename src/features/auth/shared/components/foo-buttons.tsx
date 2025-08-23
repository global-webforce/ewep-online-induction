"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link"; // <- use Next.js Link, not lucide-react
import React from "react";
import { useAuth } from "../providers/auth-provider";
import { useLogout } from "../../logout/use-logout";
import LogoutButton from "../../logout/logout-button.client";

export function FooButtons() {
  const { user } = useAuth();

  return (
    <div className="flex items-center">
      {!user && ( // show login/register if NOT logged in
        <div className="flex gap-2 justify-center">
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link href="/register">
            <Button variant="default">Register</Button>
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

      {user != null && ( // show dashboard if logged in
        <LogoutButton />
      )}
    </div>
  );
}
