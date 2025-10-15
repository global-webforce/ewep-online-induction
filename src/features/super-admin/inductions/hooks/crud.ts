import {
  inductionFormSchema,
  InductionFormSchema,
  InductionRowSchema,
} from "@/features/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import {
  createAction,
  deleteAction,
  fetchAll,
  fetchById,
  updateAction,
} from "../actions";

export const useFetchAll = () =>
  useQuery({
    queryKey: ["inductions"],
    queryFn: async () => await fetchAll(),
  });

export const useFetchById = (id: string) =>
  useQuery({
    queryKey: ["inductions", id],
    queryFn: async () => await fetchById(id),
  });

export const useInductionForm = (value?: InductionRowSchema | null) => {
  const router = useRouter();

  const { id } = useParams<{
    id: string;
  }>();
  const queryClient = useQueryClient();

  const form = useForm<InductionFormSchema>({
    resolver: zodResolver(inductionFormSchema),
    mode: "onSubmit",
    defaultValues: value || {
      title: "",
      description: "",
      validity_days: null,
    },
    values: value || undefined,
  });

  const formContext = useFormContext<InductionFormSchema>();

  const createMutation = useMutation({
    mutationFn: (values: InductionFormSchema) => createAction(values),
    onError: (error: any) => {
      toast.error(error.message || "Failed to create induction.");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["inductions"] });
      toast.success("Induction has been created.");
      form.reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (values: InductionFormSchema) => updateAction(id, values),
    onError: (error: any) => {
      toast.error(error.message || "Failed to update induction.");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["inductions"] });
      toast.success("Induction has been updated.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => await deleteAction(id),
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong while deleting.");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["inductions"] });
      toast.success("Induction has been deleted.");
      router.push(`/dashboard/inductions/`);
    },
  });

  return {
    form,
    formContext,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
