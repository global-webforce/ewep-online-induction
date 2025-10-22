"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { SessionFormRLSSchema } from "@/features/types";
import { fetchAll, fetchById, upsertAction } from "../actions";

export const useFetchAll = () =>
  useQuery({
    queryKey: ["induction_sessions_view"],
    queryFn: async () => await fetchAll(),
  });

export const useFetchById = (id: string) =>
  useQuery({
    queryKey: ["induction_sessions_view", id],
    queryFn: () => fetchById(id),
  });

export const useUpsert = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: SessionFormRLSSchema) => upsertAction(values),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["induction_sessions_view"],
      });
      toast.success("Record has been created.");
      router.replace("/dashboard/induction-sessions/" + data?.id);
    },
  });
};
