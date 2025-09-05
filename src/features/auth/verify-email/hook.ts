"use client";

import { useMutation } from "@tanstack/react-query";
import { verifyEmailAction } from "./action";

export function useResendVerificationEmail() {
  return useMutation({
    mutationFn: (values: string) => verifyEmailAction(values),
  });
}
