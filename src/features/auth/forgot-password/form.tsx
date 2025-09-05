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
import { SimpleAlert } from "./custom-alert";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function SendResetPasswordForm({
  onBack,
}: {
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
    //  resendVerificationEmail(email);
  };

  const router = useRouter();

  return (
    <>
      <Card className="w-full max-w-md p-6">
        {isSuccess && (
          <SimpleAlert variant="success">Reset Password Link Sent!</SimpleAlert>
        )}

        {error && (
          <SimpleAlert variant="error">{(error as Error).message}</SimpleAlert>
        )}

        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">
            RESET PASSWORD
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-1">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>

            <Button
              className="w-full"
              onClick={() => onSubmit()} // <- expose via props like before
              disabled={status === "pending"}
            >
              {status === "pending" ? "Resending Email..." : "Send Reset Link"}
            </Button>
            <Button
              onClick={() => {
                reset();
                onBack ? onBack() : router.back();
              }}
              variant="ghost"
              className="w-full flex items-center justify-center gap-2"
            >
              <ArrowLeft size={16} />
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
