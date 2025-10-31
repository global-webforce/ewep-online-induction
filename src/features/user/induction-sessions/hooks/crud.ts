"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { SessionFormRLSSchema } from "@/features/types";
import { fetchAll, fetchById, upsertAction } from "../actions";

export const useFetchAll = () =>
  useQuery({
    queryKey: ["induction_sessions_view"],
    queryFn: async () => {
      const res = await fetchAll();
      if (res?.error) throw new Error(res?.error);
      return res.data;
    },
  });

export const useFetchById = (id: string) =>
  useQuery({
    queryKey: ["induction_sessions_view", id],
    queryFn: async () => {
      const res = await fetchById(id);
      if (res.error) throw new Error(res.error);
      return res.data;
    },
  });

export const useUpsert = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: SessionFormRLSSchema) => {
      const res = await upsertAction(values);
      if (res?.error) throw new Error(res.error);
      return res;
    },

    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["induction_sessions_view"],
      });
      toast.success("Record has been created.");
      router.replace("/dashboard/course-sessions/" + data.data?.id);
    },
  });
};
