"use server";

import { emailInputSchema } from "@/features/shared/models/email-input-schema";
import { authRepository } from "@/features/shared/repository";

export async function verifyEmailAction(param: string) {
  const parsed = emailInputSchema.safeParse(param);

  if (!parsed.success) {
    throw new Error("Invalid input");
  }

  await authRepository.verifyEmail(parsed.data);
}
