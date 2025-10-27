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

    queryFn: async () => {
      const res = await fetchAll();
      if (res?.error) throw new Error(res?.error);
      return res?.data;
    },
  });

export const useFetchById = (id: string) =>
  useQuery({
    queryKey: ["induction_sessions", id],

    queryFn: async () => {
      const res = await fetchById(id);
      if (res?.error) throw new Error(res?.error);
      return res?.data;
    },
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
    values: value || {
      induction_id: "",
      user_id: "",
      valid_until: null,
      has_passed: null,
    },
  });

  const formContext = useFormContext<SessionFormSchema>();

  const upsertMutation = useMutation({
    mutationFn: (values: SessionFormSchema) => upsertAction(values),
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create/update session.");
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["induction_sessions"] });
      toast.success("Session has been created/updated.");
      router.push("/dashboard/induction-sessions/" + data?.data?.id);
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
      router.push(`/dashboard/induction-sessions/`);
    },
  });

  return {
    form,
    formContext,
    upsertMutation,
    deleteMutation,
  };
};
