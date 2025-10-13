"use client";

import { AlertPanelState } from "@/components/custom/alert-panel-state";
import { FormSubmitButton } from "@/components/react-hook-form-reusable";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { fetchById, updateAction } from "../actions";
import { formSchema, FormSchema } from "../types/form";
import FormBase from "./form.base";

export function FormUpdate() {
  const { id } = useParams<{ id: string }>();

  const {
    data,
    error,

    refetch,
    isError: isErrorFetch,
  } = useQuery({
    queryKey: [`induction_sessions_super_admin_view`, id],
    queryFn: async () => await fetchById(id),
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: FormSchema) => updateAction(id, values),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["induction_sessions_super_admin_view"],
      });
      toast.success("Record has been updated.");
    },
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: data || {
      induction_id: "",
      user_id: "",
      valid_until: null,
    },
    values: data,
  });

  const onSubmit = (values: FormSchema) => mutate(values);
  return (
    <div className="space-y-4">
      {error && (
        <AlertPanelState onRetry={async () => await refetch()} variant="error">
          {error.message}
        </AlertPanelState>
      )}

      <Card className="w-full p-4">
        <FormProvider {...form}>
          <form className="space-y-4">
            <FormBase />

            <FormSubmitButton
              isSubmitting={isPending}
              onClick={form.handleSubmit(onSubmit)}
              disabled={!form.formState.isDirty || isErrorFetch}
            >
              Update
            </FormSubmitButton>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
}
