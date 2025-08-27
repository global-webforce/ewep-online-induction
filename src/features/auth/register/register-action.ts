"use server";

import { authRepository } from "../shared/repository";
import { RegisterSchema, registerSchema } from "./register-schema";

export async function registerAction(values: RegisterSchema) {
  const parsed = registerSchema.safeParse(values);
  if (!parsed.success) {
    throw new Error("Invalid input");
  }

  await authRepository.registerWithEmail(values);
}
