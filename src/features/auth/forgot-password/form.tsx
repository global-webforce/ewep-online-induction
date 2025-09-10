"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  EmailInput,
  emailInputSchema,
} from "@/features/shared/models/email-input-schema";
import { SimpleAlert } from "@/features/shared/ui/simple-alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { forgotPasswordAction } from "./action";

export default function ForgotPasswordForm() {
  const form = useForm<EmailInput>({
    resolver: zodResolver(emailInputSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, status, error, isSuccess } = useMutation({
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
            If the account email exists, a reset link has been sent.
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
          <div className="flex flex-col gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={status === "pending"}
            className="w-full"
          >
            {status === "pending" ? "Loading..." : "Send Reset Link"}
          </Button>

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
