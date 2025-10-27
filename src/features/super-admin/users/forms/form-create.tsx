"use client";

import { FormSubmitButton } from "@/components/react-hook-form-reusable/form-submit-button";
import { Card, CardContent } from "@/components/ui/card";
import { FormProvider } from "react-hook-form";

import {
  FormFieldEmail,
  FormFieldPassword,
  FormFieldSelect,
  FormFieldText,
} from "@/components/react-hook-form-reusable";

import { useCreate } from "../hooks";
import { useCreateForm } from "./use-create-form";

export function FormCreate() {
  const { createForm } = useCreateForm();
  const { mutate, isPending } = useCreate();
  const { control } = createForm;
  return (
    <Card className="w-full max-w-2xl">
      <CardContent>
        <FormProvider {...createForm}>
          <form autoComplete="off" className="space-y-4">
            <FormFieldEmail control={control} name="email" label="Email" />
            <FormFieldText
              control={control}
              name="first_name"
              label="First Name"
            />
            <FormFieldText
              control={control}
              name="last_name"
              label="Last Name"
            />

            <FormFieldSelect
              name="app_role"
              control={control}
              value={[]}
              options={[
                { value: "user", label: "User" },
                { value: "super_admin", label: "Super Admin" },
              ]}
            />

            <FormFieldPassword
              autoComplete="new-password"
              toggleVisibility={true}
              control={control}
              name="password"
              label="Password"
            />

            <FormSubmitButton
              disabled={!createForm.formState.isDirty}
              isSubmitting={isPending}
              onClick={createForm.handleSubmit((value) => mutate(value))}
            >
              Create
            </FormSubmitButton>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
