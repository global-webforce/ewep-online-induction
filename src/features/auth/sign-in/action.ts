"use server";

import { authRepository } from "@/features/auth-repository";
import { SignInInput, signInInputSchema } from "./schema";

export async function signInAction(params: SignInInput) {
  const parsed = signInInputSchema.safeParse(params);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }
  await authRepository.signIn(params);
}
