"use client";

import { AlertPanelState } from "@/components/custom/alert-panel-state";
import { FormSubmitButton } from "@/components/react-hook-form-reusable/form-submit-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Presentation, Trash2Icon } from "lucide-react";
import Link from "next/link";
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
import { useFetchById, useInductionForm } from "../hooks/crud";
import FormBase from "./form-base";

export function FormUpdate() {
  const { id } = useParams<{ id: string }>();

  const { data, error, refetch, isLoading } = useFetchById(id);

  const {
    form,
    updateMutation: { mutate: updateMutation, isPending: isUpdating },
    deleteMutation: { mutate: deleteMutation, isPending: isDeleting },
  } = useInductionForm(data);

  return (
    <div className="space-y-4">
      {error && (
        <AlertPanelState onRetry={async () => await refetch()} variant="error">
          {error.message}
        </AlertPanelState>
      )}

      <Card className="w-full p-4">
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
                      This action cannot be undone. This will permanently delete
                      this induction record.
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
      </Card>
      {data && (
        <Card className="w-full p-6 flex items-center justify-between flex-row">
          <div>
            <h3 className="text-lg font-semibold">Setup Presentation</h3>
            <p className="text-sm text-muted-foreground">
              Quickly create and customize your presentation slides.
            </p>
          </div>

          <Button asChild variant={"secondary"}>
            <Link href={`/dashboard/inductions/${id}/resources`}>
              Go to Resource Builder <Presentation className="w-4 h-4" />
            </Link>
          </Button>
        </Card>
      )}
      {data && (
        <Card className="w-full p-6 flex items-center justify-between flex-row">
          <div>
            <h3 className="text-lg font-semibold">Manage Quiz</h3>
            <p className="text-sm text-muted-foreground">
              Quickly create quiz for induction assessment.
            </p>
          </div>

          <Button asChild variant={"secondary"}>
            <Link href={`/dashboard/inductions/${id}/quizzes`}>
              Go to Quiz Builder <Presentation className="w-4 h-4" />
            </Link>
          </Button>
        </Card>
      )}
    </div>
  );
}
