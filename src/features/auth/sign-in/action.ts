"use server";

import {
  SignInInput,
  signInInputSchema,
} from "@/features/shared/models/sign-in-input-schema";
import { authRepository } from "@/features/shared/auth-repository";

export async function signInAction(params: SignInInput) {
  const parsed = signInInputSchema.safeParse(params);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }
  await authRepository.signIn(params);
}
