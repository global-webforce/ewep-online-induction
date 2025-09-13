"use client";

import { Card } from "@/components/ui/card";
import { FormField } from "@/features/react-hook-form-reusable/form-field";
import LoadingButton from "@/features/react-hook-form-reusable/form-submit";
import { SimpleAlert } from "@/features/shared/ui/simple-alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { forgotPasswordAction } from "./action";
import { EmailInput, emailInputSchema } from "./schema";

export default function ForgotPasswordForm() {
  const form = useForm<EmailInput>({
    resolver: zodResolver(emailInputSchema),
    defaultValues: {
      email: "",
    },
  });

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
          <SimpleAlert variant="success">
            Check your inbox for a reset link (if registered).
          </SimpleAlert>
        )}

        {error && (
          <SimpleAlert variant="error">{(error as Error).message}</SimpleAlert>
        )}

        <h1 className="text-center text-3xl font-bold">Forgot Password</h1>

        <form
          onSubmit={form.handleSubmit((values) => mutate(values))}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            type="email"
            name="email"
            label="Email"
            placeholder="you@example.com"
          />

          <LoadingButton type="submit" className="w-full" pending={isPending}>
            Send Password Reset Link
          </LoadingButton>

          <div className="mt-4 text-center text-sm">
            <Link href="/sign-in" className="underline underline-offset-4">
              Go back to Sign-In
            </Link>
          </div>
        </form>
      </Card>
    </>
  );
}
