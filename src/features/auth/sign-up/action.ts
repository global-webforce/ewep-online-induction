"use server";

import { authRepository } from "@/features/shared/auth-repository";
import { SignUpInput, signUpInputSchema } from "./schema";

export async function registerAction(values: SignUpInput) {
  const parsed = signUpInputSchema.safeParse(values);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  await authRepository.signUp(values);
}
