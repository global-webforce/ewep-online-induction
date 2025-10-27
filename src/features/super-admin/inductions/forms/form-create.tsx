"use client";

import { FormSubmitButton } from "@/components/react-hook-form-reusable/form-submit-button";
import { Card, CardContent } from "@/components/ui/card";
import { FormProvider } from "react-hook-form";

import { useInductionForm } from "../hooks/crud";
import FormBase from "./form-base";

export function FormCreate() {
  const {
    form,
    createMutation: { mutate, isPending },
  } = useInductionForm();

  return (
    <Card className="w-full max-w-2xl">
      <CardContent>
        <FormProvider {...form}>
          <form className="space-y-4">
            <FormBase />
            <FormSubmitButton
              disabled={!form.formState.isDirty}
              isSubmitting={isPending}
              onClick={form.handleSubmit((value) => mutate(value))}
            >
              Create
            </FormSubmitButton>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
