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
import { registerAction } from "./action";
import { SignUpInput, signUpInputSchema } from "./schema";

export default function RegisterForm() {
  const { mutate, isPending, error, reset } = useMutation({
    mutationFn: (values: SignUpInput) => registerAction(values),
  });

  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpInputSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  if (
    error?.message.toLowerCase().includes("email is not confirmed") &&
    form.getValues("email")
  )
    return (
      <VerifyEmailForm
        email={form.getValues("email")}
        onBack={() => {
          form.reset();
          reset();
        }}
      />
    );
  return (
    <Card className="w-full max-w-md p-6 ">
      {error && (
        <SimpleAlert variant="error">{(error as Error).message}</SimpleAlert>
      )}

      <h1 className="text-center text-3xl font-bold"> Sign Up</h1>

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

        <LoadingButton type="submit" className="w-full" pending={isPending}>
          Register
        </LoadingButton>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/sign-in" className="underline underline-offset-4">
            Sign in
          </Link>
        </div>
      </form>
    </Card>
  );
}
