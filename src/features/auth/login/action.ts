"use server";

import {
  LoginInput,
  loginInputSchema,
} from "@/features/shared/models/login-input-schema";
import { authRepository } from "@/features/shared/repository";

export async function loginAction(params: LoginInput) {
  const parsed = loginInputSchema.safeParse(params);
  if (!parsed.success) {
    throw new Error("Invalid input");
  }
  await authRepository.loginWithEmail(params);
}
