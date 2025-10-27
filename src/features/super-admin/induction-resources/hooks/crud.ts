import { ResourcesUpsertSchema } from "@/features/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { fetchById, upsertAction } from "../actions";

export const useFetchById = (id: string) =>
  useQuery({
    queryKey: ["induction_resources", id],

    queryFn: async () => {
      const res = await fetchById(id);
      if (res?.error) throw new Error(res?.error);
      return res?.data;
    },
  });

export const useUpsertMutation = () => {
  const { id } = useParams<{
    id: string;
  }>();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: ResourcesUpsertSchema) => {
      const res = await upsertAction(values);
      if (res?.error) throw new Error(res.error);
      return res;
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["induction_resources", id],
      });
      toast.success("Record has been updated.");
    },
  });
};
