"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema, RegisterSchema } from "./register-schema";
import { useRegisterWithEmail } from "./use-register";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default function RegisterForm() {
  const { mutate: register, status, error } = useRegisterWithEmail();

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

  return (
    <Card className="w-full max-w-md p-6 flex flex-col gap-4 bg-white rounded-lg shadow-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-semibold">
          Create an account
        </CardTitle>
      </CardHeader>

      <CardContent className="p-1">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {/* Error alert */}
          {error && (
            <Alert variant="destructive" className="flex items-center gap-2">
              <Terminal className="h-4 w-4" />
              <AlertDescription>{(error as Error).message}</AlertDescription>
            </Alert>
          )}

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
            <Button type="button" variant="outline" className="w-full">
              Register with Google
            </Button>
          </div>

          {/* Login link */}
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <a href="#" className="underline underline-offset-4">
              Login
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
