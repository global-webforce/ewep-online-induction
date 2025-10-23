"use client";

import { AlertPanel } from "@/components/custom/alert-panel";
import {
  FormFieldEmail,
  FormFieldPassword,
  FormSubmitButton,
} from "@/components/react-hook-form-reusable";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInInput, signInInputSchema } from "@/features/auth-types";
import VerifyEmailForm from "@/features/auth/verify-email/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { signInAction } from "./action";

export default function SignInForm() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signInInputSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: SignInInput) => mutate(values);
  const { mutate, reset, isPending, error } = useMutation({
    mutationFn: async (values: SignInInput) => {
      const res = await signInAction(values);
      if (res?.error) throw new Error(res.error);
      return res;
    },
    onSuccess: (data) => {
      if (data?.error) {
        return;
      }
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
      <FormProvider {...form}>
        <form className="w-full max-w-md">
          <Card>
            <CardHeader>
              {error && (
                <AlertPanel variant="error">
                  {(error as Error).message}
                </AlertPanel>
              )}

              <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <FormFieldEmail
                control={form.control}
                name="email"
                label="Email"
                placeholder="you@example.com"
              />

              <div className="flex flex-col gap-2">
                <FormFieldPassword
                  control={form.control}
                  toggleVisibility={true}
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
            </CardContent>
            <CardFooter className="flex flex-col gap-">
              <FormSubmitButton
                isSubmitting={isPending}
                onClick={form.handleSubmit(onSubmit)}
                className="w-full"
              >
                Sign In
              </FormSubmitButton>

              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?&nbsp;
                <Link href="/sign-up" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </form>
      </FormProvider>
    </>
  );
}
