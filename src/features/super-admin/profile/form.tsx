"use client";

import {
  FormFieldText,
  FormSubmitButton,
} from "@/components/react-hook-form-reusable";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  superAdmin__ProfileSchema,
  SuperAdmin__ProfileSchema,
  UserSchema,
} from "@/features/auth-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { profileUpdateAction } from "./action";

export default function SuperAdmin__ProfileForm({
  user,
}: {
  user?: UserSchema;
}) {
  const { mutate, isPending } = useMutation({
    mutationFn: (values: SuperAdmin__ProfileSchema) =>
      profileUpdateAction(values),
    onError: (error) => {
      toast.error(error.message);
      form.reset(user?.profile);
    },
    onSuccess: (_, data) => {
      toast.success("Profile has been updated.");
      form.reset(data);
    },
  });

  const form = useForm<SuperAdmin__ProfileSchema>({
    resolver: zodResolver(superAdmin__ProfileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
    },
    values: user?.app_role === "super_admin" ? user?.profile : undefined,
  });

  return (
    <div className="space-y-4">
      <Card className="w-full max-w-2xl p-4">
        <div>
          <b>Basic Information</b>
          <p className="text-sm text-muted-foreground">
            Update your basic profile information.
          </p>
        </div>
        <FormProvider {...form}>
          <form className="space-y-4">
            <FormFieldText
              control={form.control}
              name="first_name"
              label="First Name"
            />
            <FormFieldText
              control={form.control}
              name="last_name"
              label="Last Name"
            />

            <FormSubmitButton
              disabled={!form.formState.isDirty}
              isSubmitting={isPending}
              onClick={form.handleSubmit((value) => mutate(value))}
            >
              Update
            </FormSubmitButton>
          </form>
        </FormProvider>
      </Card>

      <Card className="w-full max-w-2xl  p-4 gap-4">
        <div>
          <b>Account Information</b>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={"email"}>Email</Label>
            <Input name="email" readOnly type="email" value={user?.email} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={"role"}>Role</Label>
            <Input value={user?.app_role} readOnly type="text" />
          </div>
        </div>
      </Card>
    </div>
  );
}
