"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { signInAction } from "./action";
import { SignInInput } from "@/features/shared/models/sign-in-input-schema";

export function useLoginWithEmail() {
  const router = useRouter();
  return useMutation({
    mutationFn: (values: SignInInput) => signInAction(values),
    onSuccess: () => {
      router.push(`/dashboard`);
    },
  });
}
