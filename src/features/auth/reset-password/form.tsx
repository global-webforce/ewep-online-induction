"use client";

import { AlertPanel } from "@/components/custom/alert-panel";
import {
  FormFieldPassword,
  FormSubmitButton,
} from "@/components/react-hook-form-reusable";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ResetPasswordInput,
  resetPasswordInputSchema,
} from "@/features/auth-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { logoutAction } from "../sign-out/action";
import { resetPasswordAction } from "./action";

// This component changes the flow so that when the user clicks "Reset Password",
// we first show a confirmation dialog. If the user confirms, we perform the
// reset (mutation) and immediately sign the user out and redirect to sign-in.

export default function ResetPasswordForm() {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingValues, setPendingValues] = useState<ResetPasswordInput | null>(
    null
  );

  const {
    mutate,
    isPending: isLoading,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (values: ResetPasswordInput) => resetPasswordAction(values),
    onSuccess: async () => {
      await logoutAction();
      router.push("/sign-in?reset=success");
    },
  });

  const isPending = isLoading || isSuccess;

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordInputSchema),
    disabled: isPending,
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  // Called when the form is valid — we save values and open the confirmation dialog
  const handleValidSubmit = (values: ResetPasswordInput) => {
    setPendingValues(values);
    setConfirmOpen(true);
  };

  // Called when the user confirms the dialog — triggers the actual mutation
  const handleConfirm = () => {
    if (!pendingValues) return;
    mutate(pendingValues);
    setConfirmOpen(false);
  };

  return (
    <Card className="w-full max-w-md p-6 ">
      {isError && (
        <AlertPanel variant="error">{(error as Error)?.message}</AlertPanel>
      )}

      <h1 className="text-2xl font-bold">Reset Password</h1>

      {/* Reset Form: submitting opens confirmation dialog */}
      {
        <FormProvider {...form}>
          <form className="space-y-4">
            <FormFieldPassword
              toggleVisibility={true}
              control={form.control}
              name="password"
              label="New Password"
            />

            <FormFieldPassword
              control={form.control}
              name="confirm_password"
              label="Confirm New Password"
            />

            <FormSubmitButton
              type="button"
              onClick={() => handleValidSubmit(form.getValues())}
              className="w-full"
            >
              Reset Password
            </FormSubmitButton>

            <div className="mt-2 text-center text-sm">
              <Link href="/dashboard" className="underline underline-offset-4">
                Go to Dashboard
              </Link>
            </div>
          </form>
        </FormProvider>
      }

      {/* Confirmation dialog shown before performing the reset */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm password reset</DialogTitle>
            <DialogDescription>
              This will update your account password. You will be signed out and
              will need to sign in again with the new password. Do you want to
              continue?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button onClick={handleConfirm} disabled={isLoading}>
              {isLoading ? "Resetting..." : "Yes, reset password"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
