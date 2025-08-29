"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircleIcon, Mail, Terminal } from "lucide-react";
import { useResendVerificationEmail } from "./use-resend";

export default function ResendVerificationEmailForm({
  email,
}: {
  email: string;
}) {
  const {
    mutate: resendVerificationEmail,
    status,
    isSuccess,
    error,
  } = useResendVerificationEmail();

  const onSubmit = () => {
    resendVerificationEmail(email);
  };

  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {!isSuccess && (
            <>
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Check your email</CardTitle>
            </>
          )}

          {isSuccess && (
            <>
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-2xl">
                New Verification Email Sent!
              </CardTitle>
            </>
          )}
        </CardHeader>
        <CardContent className="space-y-4  ">
          {/* Error alert */}
          {error && (
            <Alert variant="destructive" className="flex items-center gap-2">
              <AlertCircleIcon />
              <AlertDescription>{(error as Error).message}</AlertDescription>
            </Alert>
          )}

          <Alert>
            <AlertDescription className="text-center justify-center inline text-foreground">
              Please verify your email address by clicking the link sent to{" "}
              <b className="">{email}</b>
            </AlertDescription>
          </Alert>

          <Button
            onClick={onSubmit}
            disabled={status === "pending"}
            className="w-full"
          >
            {status === "pending"
              ? "Resending..."
              : "Resend Verification Email"}
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
