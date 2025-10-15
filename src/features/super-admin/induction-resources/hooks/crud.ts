import { ResourcesUpsertSchema } from "@/features/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchById, upsertAction } from "../actions";

export const useFetchById = (id: string) =>
  useQuery({
    queryKey: ["induction_resources", id],
    queryFn: async () => await fetchById(id),
  });

export const useUpsertMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (value: ResourcesUpsertSchema) => upsertAction(value),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["induction_resources"],
      });
      toast.success("Record has been updated.");
    },
  });
};
