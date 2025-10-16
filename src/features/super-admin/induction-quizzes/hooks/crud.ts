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
    queryFn: async () => await fetchAll(id),
  });

export const useFetchById = (id: string) =>
  useQuery({
    queryKey: ["induction_quizzes", id],
    queryFn: async () => await fetchById(id),
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
    mutationFn: (values: QuizFormSchema) => createAction(values),
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
    mutationFn: (values: QuizFormSchema) => updateAction(quiz_id, values),
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update quiz.");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["induction_quizzes"] });
      toast.success("Quiz has been updated.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => await deleteAction(quiz_id),
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
