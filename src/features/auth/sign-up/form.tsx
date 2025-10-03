"use client";

import { Card } from "@/components/ui/card";
import { FormField } from "@/components/react-hook-form-reusable/form-field";
import LoadingButton from "@/components/react-hook-form-reusable/form-submit";
import { AlertPanel } from "@/components/custom/alert-panel";
import VerifyEmailForm from "@/features/auth/verify-email/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signUpAction } from "./action";
import { SignUpInput, signUpInputSchema } from "./schema";

export default function SignUpForm() {
  const { mutate, isPending, error, reset } = useMutation({
    mutationFn: (values: SignUpInput) => signUpAction(values),
  });

  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpInputSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      confirm_password: "",
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
        <AlertPanel variant="error">{(error as Error).message}</AlertPanel>
      )}

      <h1 className="text-center text-3xl font-bold"> Sign Up</h1>

      <form
        onSubmit={form.handleSubmit((values) => mutate(values))}
        className="flex flex-col gap-4"
      >
        <div className="flex gap-3">
          <FormField
            control={form.control}
            type="text"
            name="first_name"
            label="First Name"
            placeholder="First Name"
          />

          <FormField
            control={form.control}
            type="text"
            name="last_name"
            label="Last Name"
            placeholder="Last Name"
          />
        </div>{" "}
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
          name="confirm_password"
          label="Confirm Password"
        />
        <LoadingButton type="submit" className="w-full" pending={isPending}>
          Sign Up
        </LoadingButton>
        <div className="mt-2 text-center text-sm">
          Already have an account?{" "}
          <Link href="/sign-in" className="underline underline-offset-4">
            Sign in
          </Link>
        </div>
      </form>
    </Card>
  );
}
