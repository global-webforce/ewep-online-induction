"use client";

import { Card } from "@/components/ui/card";
import { FormField } from "@/features/react-hook-form-reusable/form-field";
import LoadingButton from "@/features/react-hook-form-reusable/form-submit";
import { SimpleAlert } from "@/features/shared/ui/simple-alert";
import VerifyEmailForm from "@/features/auth/verify-email/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { resetPasswordAction } from "./action";
import { ResetPasswordInput, resetPasswordInputSchema } from "./schema";
import { logoutAction } from "../sign-out/action";

export default function ResetPasswordForm() {
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: (values: ResetPasswordInput) => resetPasswordAction(values),
    onSuccess: () => {
      setTimeout(() => {
        logoutAction();
      }, 3000);
    },
  });

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordInputSchema),
    disabled: isPending || isSuccess,
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <Card className="w-full max-w-md p-6 ">
      {isSuccess && (
        <SimpleAlert variant="success">
          Password updated successfully. <br />
          You'll be signed out shortly...
        </SimpleAlert>
      )}

      {error && (
        <SimpleAlert variant="error">{(error as Error).message}</SimpleAlert>
      )}

      <h1 className="text-center text-3xl font-bold"> Reset Password</h1>

      <form
        onSubmit={form.handleSubmit((values) => mutate(values))}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          type="password"
          name="password"
          label="Password"
        />

        <FormField
          control={form.control}
          type="password"
          name="confirmPassword"
          label="Confirm Password"
        />

        <LoadingButton
          type="submit"
          className="w-full"
          pending={isPending || isSuccess}
        >
          Reset Password
        </LoadingButton>
      </form>
    </Card>
  );
}
