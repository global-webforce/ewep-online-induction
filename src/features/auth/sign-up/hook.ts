import { useMutation } from "@tanstack/react-query";
import { registerAction } from "./action";
import { SignUpInput } from "@/features/shared/models/sign-up-input-schema";

export function useRegisterWithEmail() {
  return useMutation({
    mutationFn: (values: SignUpInput) => registerAction(values),
  });
}
