import { Button } from "@/components/ui/button";
import React from "react";
import { authRepository } from "../shared/repository/auth-repository-remote.client";

export default async function LogoutButton() {
  const user = await authRepository.getCurrentUser();

  return (
    <>
      {user != null && ( // show dashboard if logged in
        <div className="flex gap-2 justify-end">
          <Button
            onClick={async () => await authRepository.logout()}
            variant="default"
          >
            Logout
          </Button>
        </div>
      )}
    </>
  );
}
