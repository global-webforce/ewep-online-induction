"use server";

import {
  SignUpInput,
  signUpInputSchema,
} from "@/features/shared/models/sign-up-input-schema";
import { authRepository } from "@/features/shared/repository";

export async function registerAction(values: SignUpInput) {
  const parsed = signUpInputSchema.safeParse(values);
  if (!parsed.success) {
    throw new Error("Invalid input");
  }

  await authRepository.signUp(values);
}
