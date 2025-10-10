"use client";

import FormSubmitButton from "@/components/react-hook-form-reusable/form-submit-button";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { createAction } from "../actions/create-action";
import { formSchema, FormSchema } from "../types/form";
import FormBase from "./form.base";

export function FormCreate() {
  const { id } = useParams<{ id: string }>();

  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: FormSchema) => createAction(values),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["induction-quizzes"] });
      toast.success("Record has been created.");
      router.replace(`/dashboard/inductions/${id}/quizzes/${data.id}`);
    },
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      correct_answer: "",
      induction_id: id,
      options: [{ value: "" }],
    },
  });
  const onSubmit = (values: FormSchema) => mutate(values);
  return (
    <Card className="w-full p-4">
      <FormProvider {...form}>
        <form className="space-y-4">
          <FormBase />

          <FormSubmitButton
            disabled={!form.formState.isDirty}
            isSubmitting={isPending}
            onClick={form.handleSubmit(onSubmit)}
          >
            Create
          </FormSubmitButton>
        </form>
      </FormProvider>
    </Card>
  );
}
