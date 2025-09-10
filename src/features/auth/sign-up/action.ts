"use server";

import {
  SignUpInput,
  signUpInputSchema,
} from "@/features/shared/models/sign-up-input-schema";
import { authRepository } from "@/features/shared/auth-repository";

export async function registerAction(values: SignUpInput) {
  const parsed = signUpInputSchema.safeParse(values);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  await authRepository.signUp(values);
}
