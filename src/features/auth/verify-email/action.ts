"use server";

import { authRepository } from "@/features/shared/auth-repository";
import z from "zod";

export async function verifyEmailAction(param: string) {
  const parsed = z.email().safeParse(param);
  if (!parsed.success) {
    throw new Error("Invalid input");
  }
  await authRepository.verifyEmail(parsed.data);
}
