import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";
import React from "react";

export default function CheckYourEmail({ email }: { email: string }) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Mail className="w-6 h-6 text-blue-600" />
        </div>
        <CardTitle className="text-xl">Check your email</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4  ">
        <Alert>
          <AlertDescription className="text-center justify-center inline ">
            Please verify your email address by clicking the link sent to{" "}
            <b className="">{email}</b>
          </AlertDescription>
        </Alert>

        <Button type="submit" disabled={false} className="w-full">
          Resend Verification Email
        </Button>
      </CardContent>
    </Card>
  );
}
