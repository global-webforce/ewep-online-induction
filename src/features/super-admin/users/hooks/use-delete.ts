"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteAction } from "../actions";
import { queryKey } from "../constants";

export const useDelete = () => {
  const { id } = useParams<{
    id: string;
  }>();

  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await deleteAction(id);
      if (res?.error) throw new Error(res.error);
      return res;
    },

    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong while deleting.");
    },
    onSuccess: async () => {
      toast.success("User has been deleted.");
      router.push(`/dashboard/users/`);
      await queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });
};
