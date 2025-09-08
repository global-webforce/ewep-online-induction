"use server";

import { authRepository } from "@/features/shared/repository";
import { redirect, RedirectType } from "next/navigation";

export async function logoutAction() {
  await authRepository.signOut();
  redirect(`/login`, RedirectType.push);
}
