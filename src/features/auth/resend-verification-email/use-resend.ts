"use client";

import { useMutation } from "@tanstack/react-query";
import { resendVerificationEmailAction } from "./resend-action";

export function useResendVerificationEmail() {
  return useMutation({
    mutationFn: (values: string) => resendVerificationEmailAction(values),
  });
}
