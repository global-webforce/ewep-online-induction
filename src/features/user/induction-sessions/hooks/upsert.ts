"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { upsertAction } from "../actions/upsert-action";
import { FormSchema } from "../types/form";

export const useUpsert = (values: FormSchema) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  useMutation({
    mutationFn: (values: FormSchema) => upsertAction(values),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["induction_sessions_user_view"],
      });
      toast.success("Record has been created.");
      router.replace("/dashboard/induction-sessions/" + data.id);
    },
  });
};
