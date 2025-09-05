"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRegisterWithEmail } from "./hook";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  RegisterSchema,
  registerSchema,
} from "@/features/shared/models/register-input-schema";
import Link from "next/link";
import VerifyEmailForm from "../verify-email/form";
import { SimpleAlert } from "../verify-email/custom-alert";

export default function RegisterForm() {
  const { mutate: register, status, error, reset } = useRegisterWithEmail();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: RegisterSchema) => {
    register(values);
  };

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

      <CardHeader>
        <CardTitle className="text-center text-3xl font-bold">
          REGISTER
        </CardTitle>
      </CardHeader>

      <CardContent className="p-1">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {/* Email field */}
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

          {/* Password field */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="password">Password</Label>
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

          {/* Confirm Password field */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...form.register("confirmPassword")}
            />
            {form.formState.errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit + Google register */}
          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              disabled={status === "pending"}
              className="w-full"
            >
              {status === "pending" ? "Creating account..." : "Register"}
            </Button>
          </div>

          {/* Login link */}
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
