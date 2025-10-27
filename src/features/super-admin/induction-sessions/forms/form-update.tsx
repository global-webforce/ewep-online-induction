"use client";

import { AlertPanelState } from "@/components/custom/alert-panel-state";
import { FormSubmitButton } from "@/components/react-hook-form-reusable";
import { Card, CardContent } from "@/components/ui/card";
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
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useFetchById, useInductionSessionForm } from "../hooks/crud";
import FormBase from "./form-base";

export function FormUpdate() {
  const { id } = useParams<{ id: string }>();

  const { data, error, isError, isLoading, refetch } = useFetchById(id);

  const {
    form,
    upsertMutation: { mutate: upsertMutation, isPending: isUpserting },
    deleteMutation: { mutate: deleteMutation, isPending: isDeleting },
  } = useInductionSessionForm(data);

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
                  isFormLoading={isLoading}
                  isSubmitting={isUpserting}
                  onClick={form.handleSubmit((value) => upsertMutation(value))}
                  disabled={!form.formState.isDirty || isError}
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
                        delete this induction record.
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
