import { useMutation } from "@tanstack/react-query";
import { loginAction } from "./login-action";
import { LoginSchema } from "./login-schema";

export function useLoginWithEmail() {
  return useMutation({
    mutationFn: (values: LoginSchema) => loginAction(values),
  });
}
