import { useMutation } from "@tanstack/react-query";
import { authRepository } from "../shared/repository/auth-repository-remote.client";

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      await authRepository.logout();
    },
  });
}
