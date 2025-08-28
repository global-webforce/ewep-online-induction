"use server";

import { authRepository } from "@/features/auth/shared/repository";
import { redirect, RedirectType } from "next/navigation";

export async function logoutAction() {
  await authRepository.logout();
  redirect(`/login`, RedirectType.push);
}
