import {
  user__FormSchema,
  User__FormSchema,
  User__RowViewSchema,
} from "@/features/auth-types";

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
    queryKey: ["users_view"],
    queryFn: async () => await fetchAll(),
  });

export const useFetchById = (id: string) =>
  useQuery({
    queryKey: ["users_view", id],
    queryFn: async () => await fetchById(id),
  });

export const useUserForm = (value?: User__RowViewSchema | null) => {
  const router = useRouter();

  const { id } = useParams<{
    id: string;
  }>();
  const queryClient = useQueryClient();

  const form = useForm<User__FormSchema>({
    resolver: zodResolver(user__FormSchema),
    mode: "onSubmit",

    defaultValues: {
      email: "",
      app_role: "user",
      password: undefined,
      confirmed: true,
      first_name: "",
      last_name: "",
    },
    values: value || undefined,
  });

  const formContext = useFormContext<User__FormSchema>();

  const createMutation = useMutation({
    mutationFn: (values: User__FormSchema) =>
      createAction({
        ...values,
        password: values.password?.trim() !== "" ? values.password : undefined,
      }),
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create user.");
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["users_view"] });
      toast.success("User has been created.");
      router.push("/dashboard/users/" + data?.id);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (values: User__FormSchema) =>
      updateAction(id, {
        ...values,
        password: values.password?.trim() !== "" ? values.password : undefined,
      }),
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update user.");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users_view"] });
      toast.success("User has been updated.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => await deleteAction(id),
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong while deleting.");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users_view"] });
      toast.success("User has been deleted.");
      router.push(`/dashboard/users/`);
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
