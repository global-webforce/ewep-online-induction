"use server";

import { authRepository } from "@/features/auth-repository";
import { ResetPasswordInput, resetPasswordInputSchema } from "./schema";

export async function resetPasswordAction(values: ResetPasswordInput) {
  const parsed = resetPasswordInputSchema.safeParse(values);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  await authRepository.updatePassword(parsed.data.confirmPassword);
}
