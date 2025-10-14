"use client";

import { FormSubmitButton } from "@/components/react-hook-form-reusable/form-submit-button";
import { Card } from "@/components/ui/card";
import { FormProvider } from "react-hook-form";
import { useCreate, useFormData } from "../hooks/crud";
import FormBase from "./form-base";

export function FormCreate() {
  const { mutate, isPending } = useCreate();

  const form = useFormData();

  return (
    <Card className="w-full p-4">
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
    </Card>
  );
}
