"use server";

import { authRepository } from "@/features/shared/auth-repository";
import { redirect, RedirectType } from "next/navigation";

export async function logoutAction() {
  await authRepository.signOut();
  redirect(`/sign-in`, RedirectType.replace);
}
