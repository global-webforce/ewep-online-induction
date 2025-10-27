"use client";

import { FormSubmitButton } from "@/components/react-hook-form-reusable";
import { Card, CardContent } from "@/components/ui/card";

import { FormProvider } from "react-hook-form";
import { useInductionSessionForm } from "../hooks/crud";
import FormBase from "./form-base";

export function FormCreate() {
  const {
    form,
    upsertMutation: { mutate, isPending },
  } = useInductionSessionForm();

  return (
    <Card className="w-full max-w-2xl">
      <CardContent>
        <FormProvider {...form}>
          <form className="space-y-4">
            <FormBase />

            <FormSubmitButton
              isSubmitting={isPending}
              onClick={form.handleSubmit((value) => mutate(value))}
              disabled={!form.formState.isDirty}
            >
              Create
            </FormSubmitButton>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
