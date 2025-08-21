import { useMutation } from "@tanstack/react-query";
import { authRepository } from "../shared/repository/auth-repository";
import { LoginSchema } from "./login-schema";

export function useLoginWithEmail() {
  return useMutation({
    mutationFn: async (data: LoginSchema) => {
      // The repository throws on error, React Query catches it automatically
      const result = await authRepository.loginWithEmail(
        data.email,
        data.password
      );
      return result.user; // only return the user
    },
  });
}
