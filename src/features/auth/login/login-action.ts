"use server";

import { authRepository } from "@/features/auth/shared/repository";
import { LoginSchema, loginSchema } from "./login-schema";

export async function loginAction(values: LoginSchema) {
  const parsed = loginSchema.safeParse(values);
  if (!parsed.success) {
    throw new Error("Invalid input");
  }

  const { email, password } = parsed.data;
  await authRepository.loginWithEmail(email, password);
}
