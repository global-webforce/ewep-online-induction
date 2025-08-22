import { useMutation } from "@tanstack/react-query";

import { RegisterSchema } from "./register-schema";
import { authRepository } from "../shared/repository";

export function useRegisterWithEmail() {
  return useMutation({
    mutationFn: async (data: RegisterSchema) => {
      // The repository throws on error, React Query catches it automatically
      const result = await authRepository.registerWithEmail(data);
    },
  });
}
