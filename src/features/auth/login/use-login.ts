import { useMutation } from "@tanstack/react-query";

import { LoginSchema } from "./login-schema";
import { authRepository } from "../shared/repository/auth-repository-remote.client";

export function useLoginWithEmail() {
  return useMutation({
    mutationFn: async (data: LoginSchema) => {
      // The repository throws on error, React Query catches it automatically
      const result = await authRepository.loginWithEmail(
        data.email,
        data.password
      );
    },
  });
}
