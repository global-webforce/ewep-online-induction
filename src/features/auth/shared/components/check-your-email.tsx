import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";
import React from "react";

export default function CheckYourEmail() {
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
          <AlertDescription className="text-center justify-center ">
            We've sent a confirmation link to your email. <br />
            Please verify to continue.
          </AlertDescription>
        </Alert>
        <div className="text-center text-sm text-gray-600">
          Didn't receive the email? Check your spam folder or{" "}
          <button type="submit" className="text-blue-600 hover:underline">
            Try again.
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
