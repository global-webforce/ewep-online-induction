"use client";

import { AlertPanelState } from "@/components/custom/alert-panel-state";
import { FormSubmitButton } from "@/components/react-hook-form-reusable/form-submit-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Presentation } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FormProvider } from "react-hook-form";

import { useFetchById, useFormData, useUpdate } from "../hooks/crud";
import FormBase from "./form-base";

export function FormUpdate() {
  const { id } = useParams<{ id: string }>();

  const { data, error, refetch, isLoading } = useFetchById(id);

  const { mutate, isPending } = useUpdate(id);

  const form = useFormData(data);

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
              onClick={form.handleSubmit((value) => mutate(value))}
            >
              Update
            </FormSubmitButton>
          </form>
        </FormProvider>
      </Card>
      {data && (
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
      )}
      {data && (
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
      )}
    </div>
  );
}
