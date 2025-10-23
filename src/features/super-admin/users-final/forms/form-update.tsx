"use client";

import { AlertPanelState } from "@/components/custom/alert-panel-state";
import { FormSubmitButton } from "@/components/react-hook-form-reusable/form-submit-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import { FormProvider } from "react-hook-form";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useFetchById, useUserForm } from "../hooks/crud";
import FormBase from "./form-base";

export function FormUpdate() {
  const { id } = useParams<{ id: string }>();

  const { data, error, refetch, isLoading } = useFetchById(id);

  const {
    form,
    updateMutation: { mutate: updateMutation, isPending: isUpdating },
    deleteMutation: { mutate: deleteMutation, isPending: isDeleting },
  } = useUserForm(data);

  return (
    <div className="space-y-4">
      {error && (
        <AlertPanelState onRetry={async () => await refetch()} variant="error">
          {error.message}
        </AlertPanelState>
      )}

      <Card className="w-full max-w-2xl">
        <CardContent>
          <FormProvider {...form}>
            <form className="space-y-4">
              <FormBase />

              <div className="flex justify-between gap-4">
                <FormSubmitButton
                  type="submit"
                  disabled={!form.formState.isDirty}
                  isFormLoading={isLoading}
                  isSubmitting={isUpdating}
                  onClick={form.handleSubmit((value) => updateMutation(value))}
                >
                  Update
                </FormSubmitButton>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="icon" disabled={!data}>
                      <Trash2Icon />
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this user record.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteMutation()}
                        disabled={isDeleting}
                      >
                        {isDeleting ? "Deleting..." : "Delete"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
