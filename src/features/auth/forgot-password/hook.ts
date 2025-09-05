"use client";

import { useMutation } from "@tanstack/react-query";
import { sendResetPasswordLinkAction } from "./action";

export function useResendVerificationEmail() {
  return useMutation({
    mutationFn: (values: string) => sendResetPasswordLinkAction(values),
  });
}
