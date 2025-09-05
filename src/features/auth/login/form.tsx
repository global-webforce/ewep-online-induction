"use client";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  LoginInput,
  loginInputSchema,
} from "@/features/shared/models/login-input-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import VerifyEmailForm from "../verify-email/form";
import { useLoginWithEmail } from "./hook";
import { SimpleAlert } from "../verify-email/custom-alert";

export default function LoginForm() {
  const { mutate: login, status, error, reset } = useLoginWithEmail();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginInputSchema),
    defaultValues: {
      email: "",
      password: "",
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

        <h1 className="text-center text-3xl font-bold"> LOG IN</h1>

        <form
          onSubmit={form.handleSubmit((values) => login(values))}
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

          <div className="flex flex-col gap-1">
            <div className="flex">
              <Label htmlFor="password">Password</Label>

              <Link
                href="/forgot-password"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={status === "pending"}
            className="w-full"
          >
            {status === "pending" ? "Logging in..." : "Login"}
          </Button>

          <div className="mt-4 text-center text-sm">
            Don't have an account?&nbsp;
            <Link href="/register" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </form>
      </Card>
    </>
  );
}
