"use client";

import { AlertPanelState } from "@/components/custom/alert-panel-state";
import { FormSubmitButton } from "@/components/react-hook-form-reusable";
import { Card } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { FormProvider } from "react-hook-form";

import { useFetchById, useFormData, useUpsert } from "../hooks/crud";
import FormBase from "./form-base";

export function FormUpdate() {
  const { id } = useParams<{ id: string }>();

  const { data, error, refetch, isError } = useFetchById(id);

  const { mutate, isPending } = useUpsert();

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
              isSubmitting={isPending}
              onClick={form.handleSubmit((value) => mutate(value))}
              disabled={!form.formState.isDirty || isError}
            >
              Update
            </FormSubmitButton>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
}
