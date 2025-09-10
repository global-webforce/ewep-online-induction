"use server";

import { emailSchema } from "@/features/shared/models/email-input-schema";
import { authRepository } from "@/features/shared/auth-repository";

export async function verifyEmailAction(param: string) {
  const parsed = emailSchema.safeParse(param);
  if (!parsed.success) {
    throw new Error("Invalid input");
  }
  await authRepository.verifyEmail(parsed.data);
}
