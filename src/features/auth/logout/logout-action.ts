"use server";

import { authRepositoryServer } from "../shared/repository/auth-repository-remote-server-side";

export async function logoutAction() {
  await authRepositoryServer.logout();
}
