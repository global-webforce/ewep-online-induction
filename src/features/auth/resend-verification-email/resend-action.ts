"use server";

import { authRepository } from "@/features/auth/shared/repository";
import z from "zod";

export async function resendVerificationEmailAction(value: string) {
  const parsed = z.email().safeParse(value);

  if (!parsed.success) {
    throw new Error("Invalid input");
  }

  await authRepository.resendVerificationEmail(parsed.data);
}
