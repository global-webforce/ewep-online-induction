"use client";

import { AlertPanelState } from "@/components/custom/alert-panel-state";
import { FormSubmitButton } from "@/components/react-hook-form-reusable/form-submit-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Presentation } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { fetchById, updateAction } from "../actions";
import { formSchema, FormSchema } from "../types/form";
import FormBase from "./form.base";

export function FormUpdate() {
  const { id } = useParams<{ id: string }>();

  const { data, error, refetch, isLoading } = useQuery({
    queryKey: [`inductions`, id],
    queryFn: async () => await fetchById(id),
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: FormSchema) => updateAction(id, values),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["inductions"] });
      toast.success("Record has been updated.");
    },
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: data || {
      title: "",
      description: "",
      validity_days: null,
      status: "draft",
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
              disabled={!form.formState.isDirty}
              isFormLoading={isLoading}
              isSubmitting={isPending}
              onClick={form.handleSubmit(onSubmit)}
            >
              Update
            </FormSubmitButton>
          </form>
        </FormProvider>
      </Card>
      <Card className="w-full p-6 flex items-center justify-between flex-row">
        <div>
          <h3 className="text-lg font-semibold">Setup Presentation</h3>
          <p className="text-sm text-muted-foreground">
            Quickly create and customize your presentation slides.
          </p>
        </div>

        <Button asChild variant={"secondary"}>
          <Link href={`/dashboard/inductions/${id}/resources`}>
            Go to Resource Builder <Presentation className="w-4 h-4" />
          </Link>
        </Button>
      </Card>
      <Card className="w-full p-6 flex items-center justify-between flex-row">
        <div>
          <h3 className="text-lg font-semibold">Manage Quiz</h3>
          <p className="text-sm text-muted-foreground">
            Quickly create quiz for induction assessment.
          </p>
        </div>

        <Button asChild variant={"secondary"}>
          <Link href={`/dashboard/inductions/${id}/quizzes`}>
            Go to Quiz Builder <Presentation className="w-4 h-4" />
          </Link>
        </Button>
      </Card>
    </div>
  );
}
