"use client";

import { logoutAction } from "@/features/auth/sign-out/action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateAction } from "../actions/update-action";
import { message, queryKey, U } from "../constants";

export const useUpdate = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: U) => {
      const payload = <U>{
        ...values,
        password: values.password?.trim() !== "" ? values.password : undefined,
      };

      const res = await updateAction({
        ...payload,
      });
      if (res?.error) throw new Error(res.error);
      return res;
    },

    onError: (error: Error) => {
      toast.error(error.message || message.updateFailed);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast.success(message.updateSuccess);
      await logoutAction();
      router.replace("/sign-in");
    },
  });
};
