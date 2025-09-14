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
import { ProfileInput, profileInputSchema } from "./schema";
import { Button } from "@/components/ui/button";

export default function ProfileForm() {
  const { mutate, isPending, error, reset } = useMutation({
    mutationFn: (values: ProfileInput) => registerAction(values),
  });

  const form = useForm<ProfileInput>({
    resolver: zodResolver(profileInputSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <Card className="w-full max-w-lg p-6 ">
      {error && (
        <SimpleAlert variant="error">{(error as Error).message}</SimpleAlert>
      )}

      <div>
        <b>Personal Information</b>
        <p> Update your personal details and profile information.</p>
      </div>

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
      </form>

      <Button asChild variant="outline" className="w-full">
        <Link href="/reset-password">Reset Password</Link>
      </Button>
    </Card>
  );
}
