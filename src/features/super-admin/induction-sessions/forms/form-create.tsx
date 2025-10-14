"use client";

import { FormSubmitButton } from "@/components/react-hook-form-reusable";
import { Card } from "@/components/ui/card";
import { FormProvider } from "react-hook-form";
import { useFormData, useUpsert } from "../hooks/crud";

import FormBase from "./form-base";

export function FormCreate() {
  const { mutate, isPending } = useUpsert();

  const form = useFormData();

  return (
    <Card className="w-full p-4">
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
    </Card>
  );
}
