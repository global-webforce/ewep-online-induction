"use server";

import { authRepository } from "@/features/shared/auth-repository";
import { EmailInput, emailInputSchema } from "./schema";

export async function forgotPasswordAction(params: EmailInput) {
  const parsed = emailInputSchema.safeParse(params);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }
  await authRepository.forgotPassword(parsed.data.email);
}
