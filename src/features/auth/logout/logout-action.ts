"use server";

import { redirect, RedirectType } from "next/navigation";
import { authRepository } from "../shared/repository/auth-repository-remote";

export async function logoutAction() {
  await authRepository.logout();
  redirect(`/login`, RedirectType.push);
}
