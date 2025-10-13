"use client";

import { FormSubmitButton } from "@/components/react-hook-form-reusable";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { createAction } from "../actions/create-action";
import { formSchema, FormSchema } from "../types/form";
import FormBase from "./form.base";

export function FormCreate() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: FormSchema) => createAction(values),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Record has been created.");
      router.replace("/dashboard/induction-sessions/" + data.id);
    },
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      induction_id: "",
      user_id: "",
      valid_until: null,
    },
  });
  const onSubmit = (values: FormSchema) => mutate(values);
  return (
    <Card className="w-full p-4">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormBase />

          <FormSubmitButton
            isSubmitting={isPending}
            onClick={form.handleSubmit(onSubmit)}
            disabled={!form.formState.isDirty}
          >
            Create
          </FormSubmitButton>
        </form>
      </FormProvider>
    </Card>
  );
}
