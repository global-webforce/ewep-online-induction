"use server";

import { redirect, RedirectType } from "next/navigation";
import { AuthRepositoryRemoteServer } from "../shared/repository/auth-repository-remote-server";

const authRepository = new AuthRepositoryRemoteServer();

export async function logoutAction() {
  await authRepository.logout();
  redirect(`/login`, RedirectType.push);
}
