"use server";

import { authRepository } from "@/features/shared/auth-repository";
import { ProfileInput, profileInputSchema } from "./schema";

export async function registerAction(values: ProfileInput) {
  const parsed = profileInputSchema.safeParse(values);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  // await authRepository.profile(values);
}
