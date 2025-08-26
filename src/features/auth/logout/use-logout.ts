import { useMutation } from "@tanstack/react-query";
import { authRepository } from "../shared/repository";

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      await authRepository.logout();
    },
  });
}
