"use client";

import { Button } from "@/components/ui/button";

import { logoutAction } from "./logout-action";

export default function LogoutButton() {
  return (
    <>
      {
        // show dashboard if logged in
        <div className="flex gap-2 justify-end">
          <Button onClick={async () => await logoutAction()} variant="default">
            Logout
          </Button>
        </div>
      }
    </>
  );
}
