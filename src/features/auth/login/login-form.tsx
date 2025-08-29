"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "./login-schema";
import { useLoginWithEmail } from "./use-login";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Terminal } from "lucide-react";
import CheckYourEmail from "../shared/components/check-your-email";
import ResendVerificationEmailForm from "../resend-verification-email/resend-form";

export default function LoginForm() {
  const { mutate: login, status, error } = useLoginWithEmail();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginSchema) => {
    login(values);
  };

  if (error?.message.includes("Email not confirmed") && form.getValues("email"))
    return <ResendVerificationEmailForm email={form.getValues("email")} />;

  return (
    <>
      <Card className="w-full max-w-md p-6 flex flex-col gap-4  rounded-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Login to your account
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
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
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

            {/* Submit + Google login */}
            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                disabled={status === "pending"}
                className="w-full"
              >
                {status === "pending" ? "Logging in..." : "Login"}
              </Button>
              <Button type="button" variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>

            {/* Sign up link */}
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>{" "}
    </>
  );
}
