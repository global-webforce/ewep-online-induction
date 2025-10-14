import {
  inductionFormSchema,
  InductionFormSchema,
  InductionRowSchema,
} from "@/features/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { createAction, fetchAll, fetchById, updateAction } from "../actions";

export const useFetchAll = () =>
  useQuery({
    queryKey: ["inductions"],
    queryFn: fetchAll,
  });

export const useFetchById = (id: string) =>
  useQuery({
    queryKey: ["inductions", id],
    queryFn: async () => await fetchById(id),
  });

export const useFormData = (value?: InductionRowSchema | null) =>
  useForm<InductionFormSchema>({
    resolver: zodResolver(inductionFormSchema),
    defaultValues: value || {
      title: "",
      description: "",
      validity_days: null,
      status: "draft",
    },
    values: value || undefined,
  });

export const useFormDataContext = () => useFormContext<InductionFormSchema>();

export const useCreate = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (values: InductionFormSchema) => createAction(values),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["inductions"] });
      toast.success("Record has been created.");
      router.replace("/dashboard/inductions/" + data?.id);
    },
  });
};

export const useUpdate = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: InductionFormSchema) => updateAction(id, values),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["inductions"] });
      toast.success("Record has been updated.");
    },
  });
};
