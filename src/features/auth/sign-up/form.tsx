"use client";

import { AlertPanel } from "@/components/custom/alert-panel";
import {
  FormFieldEmail,
  FormFieldPassword,
  FormFieldText,
  FormSubmitButton,
} from "@/components/react-hook-form-reusable";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import VerifyEmailForm from "@/features/auth/verify-email/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
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

  const onSubmit = (values: SignUpInput) => mutate(values);

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
    <FormProvider {...form}>
      <form className="w-full max-w-md">
        <Card>
          <CardHeader>
            {" "}
            {error && (
              <AlertPanel variant="error">
                {(error as Error).message}
              </AlertPanel>
            )}
            <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex gap-4 w-full items-stretch flex-row">
              <FormFieldText
                control={form.control}
                name="first_name"
                label="First Name"
                placeholder="First Name"
                autoComplete="off"
              />

              <FormFieldText
                control={form.control}
                name="last_name"
                label="Last Name"
                placeholder="Last Name"
              />
            </div>
            <FormFieldEmail
              control={form.control}
              name="email"
              label="Email"
              placeholder="you@example.com"
              autoComplete="off"
            />
            <FormFieldPassword
              control={form.control}
              toggleVisibility={true}
              name="password"
              label="Password"
              placeholder="Password"
            />
            <FormFieldPassword
              control={form.control}
              name="confirm_password"
              label="Confirm Password"
              placeholder="Confirm Password"
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-6">
            <FormSubmitButton
              isSubmitting={isPending}
              onClick={form.handleSubmit(onSubmit)}
              className="w-full"
            >
              Sign Up
            </FormSubmitButton>

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/sign-in" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
}
