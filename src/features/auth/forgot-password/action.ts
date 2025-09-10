"use server";

import {
  EmailInput,
  emailInputSchema,
} from "@/features/shared/models/email-input-schema";
import { authRepository } from "@/features/shared/auth-repository";

export async function forgotPasswordAction(params: EmailInput) {
  const parsed = emailInputSchema.safeParse(params);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }
  await authRepository.forgotPassword(params);
}
