"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import LoadingButton from "@/features/react-hook-form-reusable/form-submit";
import { SimpleAlert } from "@/features/shared/ui/simple-alert";
import { useMutation } from "@tanstack/react-query";
import { verifyEmailAction } from "./action";

type Props = {
  email: string;
  onBack: () => void;
};

export default function VerifyEmailForm({ email, onBack }: Props) {
  const { mutate, isSuccess, isPending, error, reset } = useMutation({
    mutationFn: (_: string) => verifyEmailAction(email),
  });

  return (
    <Card className="w-full max-w-md p-6">
      {isSuccess && (
        <SimpleAlert variant="success">Link sent to your email!</SimpleAlert>
      )}

      {error && (
        <SimpleAlert variant="error">{(error as Error).message}</SimpleAlert>
      )}

      <h1 className="text-center text-3xl font-bold">Check your Inbox</h1>

      <p className="text-center">
        We’ve sent a link to{" "}
        <span className="font-semibold italic text-green-200">{email}</span>—
        check your inbox to continue.
      </p>

      <div className="flex flex-col gap-3">
        <span className="text-center text-sm text-muted-foreground">
          Didn't get the email? Check your Spam/Junk folder, or
        </span>
        <LoadingButton
          variant="outline"
          onClick={() => mutate(email)}
          className="w-full"
          pending={isPending}
        >
          Resend Link
        </LoadingButton>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          variant="ghost"
          className="w-max mx-auto"
          onClick={() => {
            reset();
            onBack();
          }}
        >
          Go back
        </Button>
      </div>
    </Card>
  );
}
