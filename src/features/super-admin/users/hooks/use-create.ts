"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createAction } from "../actions";
import { baseUrl, C, message, queryKey } from "../constants";

export const useCreate = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: C) => {
      const res = await createAction(values);
      if (res?.error) throw new Error(res.error);
      return res;
    },
    onError: (error: Error) => {
      toast.error(error.message || message.createFailed);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast.success(message.createSuccess);
      router.push(baseUrl + data.data?.id);
    },
  });
};
