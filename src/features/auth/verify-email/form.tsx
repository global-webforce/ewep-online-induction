"use client";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useResendVerificationEmail } from "./hook";
import { SimpleAlert } from "../../shared/components/custom-alert";
import Link from "next/link";

export default function VerifyEmailForm({
  email,
  onBack,
}: {
  email: string;
  onBack?: () => void;
}) {
  const {
    mutate: resendVerificationEmail,
    status,
    isSuccess,
    error,
    reset,
  } = useResendVerificationEmail();

  const onSubmit = () => {
    resendVerificationEmail(email);
  };

  const router = useRouter();

  return (
    <>
      <Card className="w-full max-w-md p-6">
        {isSuccess && (
          <SimpleAlert variant="success">
            New Verification Email Sent!
          </SimpleAlert>
        )}

        {error && (
          <SimpleAlert variant="error">{(error as Error).message}</SimpleAlert>
        )}

        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">
            Verify your email
          </CardTitle>

          <CardDescription className="text-center">
            Please open your email and click the link we sent.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-1">
          <div className="text-center text-sm text-muted-foreground">
            Didn’t get the email?
            <br />
            <span>Check your Spam/Junk folder, or</span>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => onSubmit()} // <- expose via props like before
              disabled={status === "pending"}
            >
              {status === "pending" ? "Resending Email..." : "Resend Email"}
            </Button>

            <div className="mt-4 text-center text-sm">
              <p
                onClick={() => {
                  reset();
                  onBack ? onBack() : router.back();
                }}
                className="underline underline-offset-4"
              >
                Go back
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
