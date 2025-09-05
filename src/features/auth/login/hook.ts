"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { LoginInput } from "@/features/shared/models/login-input-schema";
import { loginAction } from "./action";

export function useLoginWithEmail() {
  const router = useRouter();
  return useMutation({
    mutationFn: (values: LoginInput) => loginAction(values),
    onSuccess: () => {
      router.push(`/dashboard`);
    },
  });
}
