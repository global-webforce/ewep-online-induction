import {
  sessionFormSchema,
  SessionFormSchema,
  SessionRowSchema,
} from "@/features/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { fetchAll, fetchById, upsertAction } from "../actions";

export const useFetchAll = () =>
  useQuery({
    queryKey: ["induction_sessions_super_admin_view"],
    queryFn: fetchAll,
  });

export const useFetchById = (id: string) =>
  useQuery({
    queryKey: ["induction_sessions_super_admin_view", id],
    queryFn: async () => await fetchById(id),
  });

export const useFormData = (value?: SessionRowSchema | null) =>
  useForm<SessionFormSchema>({
    resolver: zodResolver(sessionFormSchema),
    defaultValues: value || {
      induction_id: "",
      user_id: "",
      valid_until: null,
    },
    values: value || undefined,
  });

export const useFormDataContext = () => useFormContext<SessionFormSchema>();

export const useUpsert = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (values: SessionFormSchema) => upsertAction(values),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["induction_sessions_super_admin_view"],
      });
      toast.success("Record has been created.");
      router.replace("/dashboard/induction-sessions/" + data?.id);
    },
  });
};
