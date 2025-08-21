"use client";

import { useAuth } from "../shared/providers/auth-provider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "./register-schema";
import { useRegisterWithEmail } from "./use-register";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function RegisterForm() {
  const {
    mutate: register,
    status,
    error,
    data: user,
  } = useRegisterWithEmail();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { user: x } = useAuth();

  const onSubmit = (values: RegisterSchema) => {
    register(values);
  };

  return (
    <Card className="w-full max-w-md p-6 flex flex-col gap-4 bg-white rounded-lg">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold">
          Register
        </CardTitle>
      </CardHeader>

      <CardContent className="p-1">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {x?.firstName && (
            <p className="text-sm text-muted-foreground">
              You are logged in as{" "}
              <span className="font-medium">{x.firstName}</span>
            </p>
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

          {/* Submit button */}
          <Button
            type="submit"
            disabled={status === "pending"}
            className="w-full"
          >
            {status === "pending" ? "Registering..." : "Register"}
          </Button>

          {/* Status messages */}
          {error && (
            <p className="text-sm text-red-500 text-center">
              {(error as Error).message}
            </p>
          )}
          {user && (
            <p className="text-sm text-green-600 text-center">
              Welcome, {user.email}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
