import { useMutation } from "@tanstack/react-query";
import { registerAction } from "./register-action";
import { RegisterSchema } from "./register-schema";

export function useRegisterWithEmail() {
  return useMutation({
    mutationFn: (values: RegisterSchema) => registerAction(values),
  });
}
