"use server";

import { redirect, RedirectType } from "next/navigation";
import { authRepositoryServer } from "../shared/repository/auth-repository-remote";

export async function logoutAction() {
  await authRepositoryServer.logout();
  redirect(`/login`, RedirectType.push);
}
