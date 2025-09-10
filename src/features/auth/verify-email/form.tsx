"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Email } from "@/features/shared/models/email-input-schema";
import { SimpleAlert } from "@/features/shared/ui/simple-alert";
import { useMutation } from "@tanstack/react-query";
import { verifyEmailAction } from "./action";

type Props = {
  email: Email;
  onBack: () => void;
};

export default function VerifyEmailForm({ email, onBack }: Props) {
  const { mutate, isSuccess, isPending, error, reset } = useMutation({
    mutationFn: (_: string) => verifyEmailAction(email),
  });

  return (
    <Card className="w-full max-w-md p-6">
      {isSuccess && (
        <SimpleAlert variant="success">
          New Verification Email Sent!
        </SimpleAlert>
      )}

      {error && (
        <SimpleAlert variant="error">{(error as Error).message}</SimpleAlert>
      )}

      <h1 className="text-center text-3xl font-bold">Verify your email</h1>

      <p className="text-center">
        Please open your email (
        <span className="font-semibold italic text-green-200">{email}</span>){" "}
        and click the link we sent.
      </p>

      <div className="text-center text-sm text-muted-foreground">
        Didn't get the email?
        <span> Check your Spam/Junk folder, or</span>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => mutate(email)}
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Resend Email"}
        </Button>

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
