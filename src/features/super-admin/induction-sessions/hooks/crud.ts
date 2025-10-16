import {
  sessionFormSchema,
  SessionFormSchema,
  SessionRowSchema,
} from "@/features/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { deleteAction, fetchAll, fetchById, upsertAction } from "../actions";

export const useFetchAll = () =>
  useQuery({
    queryKey: ["induction_sessions"],
    queryFn: async () => await fetchAll(),
  });

export const useFetchById = (id: string) =>
  useQuery({
    queryKey: ["induction_sessions", id],
    queryFn: async () => await fetchById(id),
  });

export const useInductionSessionForm = (value?: SessionRowSchema | null) => {
  const router = useRouter();

  const { id } = useParams<{
    id: string;
  }>();
  const queryClient = useQueryClient();

  const form = useForm<SessionFormSchema>({
    resolver: zodResolver(sessionFormSchema),
    mode: "onSubmit",
    defaultValues: value || {
      induction_id: "",
      user_id: "",
      valid_until: null,
    },
    values: value || undefined,
  });

  const formContext = useFormContext<SessionFormSchema>();

  const upsertMutation = useMutation({
    mutationFn: (values: SessionFormSchema) => upsertAction(values),
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create session.");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["induction_sessions"] });
      toast.success("Session has been established.");
      form.reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => await deleteAction(id),
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong while deleting.");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["induction_sessions"] });
      toast.success("Session has been deleted.");
      router.push(`/dashboard/induction_sessions/`);
    },
  });

  return {
    form,
    formContext,
    upsertMutation,
    deleteMutation,
  };
};
