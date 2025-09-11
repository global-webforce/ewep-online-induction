"use client";

import { Card } from "@/components/ui/card";
import { FormField } from "@/features/react-hook-form-reusable/form-field";
import LoadingButton from "@/features/react-hook-form-reusable/form-submit";
import { SimpleAlert } from "@/features/shared/ui/simple-alert";
import VerifyEmailForm from "@/features/auth/verify-email/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signInAction } from "./action";
import { signInInputSchema, SignInInput } from "./schema";

export default function SignInForm() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signInInputSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, reset, isPending, error } = useMutation({
    mutationFn: (values: SignInInput) => signInAction(values),
    onSuccess: () => {
      router.push(`/dashboard`);
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
    <>
      <Card className="w-full max-w-md p-6 ">
        {error && (
          <SimpleAlert variant="error">{(error as Error).message}</SimpleAlert>
        )}

        <h1 className="text-center text-3xl font-bold"> Sign in</h1>

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

          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              type="password"
              name="password"
              label="Password"
            />
            <Link
              href="/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <LoadingButton type="submit" className="w-full" pending={isPending}>
            Sign In
          </LoadingButton>

          <div className="mt-4 text-center text-sm">
            Don't have an account?&nbsp;
            <Link href="/sign-up" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </form>
      </Card>
    </>
  );
}
