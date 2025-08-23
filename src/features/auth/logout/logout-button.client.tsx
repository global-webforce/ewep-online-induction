import { Button } from "@/components/ui/button";
import React from "react";
import { authRepository } from "../shared/repository/auth-repository-remote.client";
import { useLogout } from "./use-logout";

// This is client component that renders a logout button.
// It uses react query mutation to handle the loading, error, and success states of the logout process.

export default function LogoutButton() {
  const { mutate: logout, status, error, data } = useLogout();
  const user = authRepository.getCurrentUser();

  return (
    <>
      {user != null && ( // show dashboard if logged in
        <div className="flex gap-2 justify-end">
          <Button
            onClick={async () => logout()}
            disabled={status === "pending"}
            className="w-full"
          >
            {status === "pending" ? "Logging out..." : "Logout"}
          </Button>
        </div>
      )}
    </>
  );
}
