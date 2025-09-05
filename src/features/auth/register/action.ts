"use server";

import {
  RegisterSchema,
  registerSchema,
} from "@/features/shared/models/register-input-schema";
import { authRepository } from "@/features/shared/repository";

export async function registerAction(values: RegisterSchema) {
  const parsed = registerSchema.safeParse(values);
  if (!parsed.success) {
    throw new Error("Invalid input");
  }

  await authRepository.registerWithEmail(values);
}
