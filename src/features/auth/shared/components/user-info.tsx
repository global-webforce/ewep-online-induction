"use client";

import { useAuth } from "../providers/auth-provider";

export function UserInfo() {
  const { user } = useAuth();

  return (
    <div className="flex items-center">
      {user && ( // show dashboard if logged in
        <p>{user.email}</p>
      )}
    </div>
  );
}
