"use client";

import { AlertPanel } from "@/components/custom/alert-panel";

import {
  FormFieldEmail,
  FormSubmitButton,
} from "@/components/react-hook-form-reusable";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { forgotPasswordAction } from "./action";
import { EmailInput, emailInputSchema } from "./schema";

export default function ForgotPasswordForm() {
  const form = useForm<EmailInput>({
    resolver: zodResolver(emailInputSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (values: EmailInput) => mutate(values);
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: (values: EmailInput) => forgotPasswordAction(values),
    onSuccess: () => {
      form.reset();
    },
  });

  return (
    <>
      <Card className="w-full max-w-md p-6 ">
        {isSuccess && (
          <AlertPanel variant="success">
            Check your inbox for a reset link (if registered).
          </AlertPanel>
        )}

        {error && (
          <AlertPanel variant="error">{(error as Error).message}</AlertPanel>
        )}

        <h1 className="text-center text-3xl font-bold">Forgot Password</h1>
        <FormProvider {...form}>
          <form className="space-y-4">
            <FormFieldEmail
              control={form.control}
              name="email"
              label="Email"
              placeholder="you@example.com"
            />

            <FormSubmitButton
              className="w-full"
              isSubmitting={isPending}
              onClick={form.handleSubmit(onSubmit)}
              disabled={!form.formState.isDirty}
            >
              Send Password Reset Link
            </FormSubmitButton>

            <div className="mt-4 text-center text-sm">
              <Link href="/sign-in" className="underline underline-offset-4">
                Go back to Sign-In
              </Link>
            </div>
          </form>
        </FormProvider>
      </Card>
    </>
  );
}
