import { useMutation } from "@tanstack/react-query";
import { logoutAction } from "./action";

export function useLogout() {
  return useMutation({
    mutationFn: () => logoutAction(),
  });
}
