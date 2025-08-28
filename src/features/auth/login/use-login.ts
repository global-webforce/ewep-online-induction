"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation"; // ✅ correct import for App Router
import { loginAction } from "./login-action";
import { LoginSchema } from "./login-schema";

export function useLoginWithEmail() {
  const router = useRouter();
  return useMutation({
    mutationFn: (values: LoginSchema) => loginAction(values),
    onSuccess: () => {
      router.push("/dashboard");
    },
  });
}
