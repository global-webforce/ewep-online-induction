import {
  quizFormSchema,
  QuizFormSchema,
  QuizRowSchema,
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

export const useFetchAll = (id: string) =>
  useQuery({
    queryKey: ["induction_quizzes"],

    queryFn: async () => {
      const res = await fetchAll(id);
      if (res?.error) throw new Error(res?.error);
      return res?.data;
    },
  });

export const useFetchById = (id: string) =>
  useQuery({
    queryKey: ["induction_quizzes", id],
    queryFn: async () => {
      const res = await fetchById(id);
      if (res?.error) throw new Error(res?.error);
      return res?.data;
    },
  });

export const useQuizForm = (value?: QuizRowSchema | null) => {
  const router = useRouter();

  const { id, quiz_id } = useParams<{ id: string; quiz_id: string }>();
  const queryClient = useQueryClient();

  const form = useForm<QuizFormSchema>({
    resolver: zodResolver(quizFormSchema),
    mode: "onSubmit",
    defaultValues: value || {
      question: "",
      correct_answer: "",
      induction_id: id,
      options: [{ value: "" }],
    },
    values: value || undefined,
  });

  const formContext = useFormContext<QuizFormSchema>();

  const createMutation = useMutation({
    mutationFn: async (values: QuizFormSchema) => {
      const res = await createAction(values);
      if (res?.error) throw new Error(res.error);
      return res;
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create quiz.");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["induction_quizzes"] });
      toast.success("Quiz has been created.");
      form.reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (values: QuizFormSchema) => {
      const res = await updateAction(quiz_id, values);
      if (res?.error) throw new Error(res.error);
      return res;
    },

    onError: (error: Error) => {
      toast.error(error.message || "Failed to update quiz.");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["induction_quizzes"] });
      toast.success("Quiz has been updated.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await deleteAction(quiz_id);
      if (res?.error) throw new Error(res.error);
      return res;
    },
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong while deleting.");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["induction_quizzes"] });
      toast.success("Record has been deleted.");
      router.push(`/dashboard/inductions/${id}/quizzes`);
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
