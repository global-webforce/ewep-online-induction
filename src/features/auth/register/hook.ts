import { useMutation } from "@tanstack/react-query";
import { registerAction } from "./action";
import { RegisterSchema } from "@/features/shared/models/register-input-schema";

export function useRegisterWithEmail() {
  return useMutation({
    mutationFn: (values: RegisterSchema) => registerAction(values),
  });
}
