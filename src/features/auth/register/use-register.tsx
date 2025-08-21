import { useMutation } from "@tanstack/react-query";
import { authRepository } from "../shared/repository/auth-repository";
import { RegisterSchema } from "./register-schema";

export function useRegisterWithEmail() {
  return useMutation({
    mutationFn: async (data: RegisterSchema) => {
      // The repository throws on error, React Query catches it automatically
      const result = await authRepository.registerWithEmail(data);
      return result.user; // only return the user
    },
  });
}
