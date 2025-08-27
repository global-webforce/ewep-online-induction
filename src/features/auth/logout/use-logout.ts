import { useMutation } from "@tanstack/react-query";
import { logoutAction } from "./logout-action";

export function useLogout() {
  return useMutation({
    mutationFn: () => logoutAction(),
  });
}
