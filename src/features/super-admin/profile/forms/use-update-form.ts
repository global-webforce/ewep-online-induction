"use client";

import { UserUpdateFormSchema } from "@/features/auth-types";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import { R, U, updateSchema } from "../constants";

export const useUpdateForm = (value?: R | null) => {
  const updateForm = useForm<U>({
    resolver: zodResolver(updateSchema),
    mode: "onSubmit",
    values: {
      email: value?.email,
      password: undefined,
      first_name: value?.profile?.first_name,
      last_name: value?.profile?.last_name,
      app_role: value?.app_role,
    },
  });

  const updateFormContext = useFormContext<UserUpdateFormSchema>();

  return {
    updateForm,
    updateFormContext,
  };
};
