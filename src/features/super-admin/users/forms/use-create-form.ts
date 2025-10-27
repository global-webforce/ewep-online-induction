"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import { C, createSchema } from "../constants";

export const useCreateForm = () => {
  const createForm = useForm<C>({
    resolver: zodResolver(createSchema),
    mode: "onSubmit",
    values: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      app_role: "user",
    },
  });

  const createFormContext = useFormContext<C>();

  return {
    createForm,
    createFormContext,
  };
};
