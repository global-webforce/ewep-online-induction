"use client";

import { AlertPanelState } from "@/components/custom/alert-panel-state";
import { FormSubmitButton } from "@/components/react-hook-form-reusable/form-submit-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2Icon } from "lucide-react";
import { FormProvider } from "react-hook-form";

import {
  FormFieldEmail,
  FormFieldPassword,
  FormFieldSelect,
  FormFieldText,
} from "@/components/react-hook-form-reusable";

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
import { useDelete, useFetchCurrentUser, useUpdate } from "../hooks";
import { useUpdateForm } from "./use-update-form";

export function FormUpdate() {
  const { data, error, refetch, isLoading } = useFetchCurrentUser();

  const { updateForm } = useUpdateForm(data);
  const { mutate: mutateUpdate, isPending: isUpdating } = useUpdate();

  const { mutate: mutateDelete, isPending: isDeleting } = useDelete();

  const { control } = updateForm;

  return (
    <div className="space-y-4">
      {error && (
        <AlertPanelState onRetry={async () => await refetch()} variant="error">
          {error.message}
        </AlertPanelState>
      )}
      <FormProvider {...updateForm}>
        <form className="space-y-4">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Update your account information.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <FormFieldEmail
                readOnly={true}
                control={control}
                name="email"
                label="Email"
              />
              <FormFieldSelect
                readOnly={true}
                name="app_role"
                label="App Role"
                control={control}
                value={[]}
                options={[
                  { value: "user", label: "User" },
                  { value: "super_admin", label: "Super Admin" },
                ]}
              />
              <FormFieldText
                control={control}
                name="first_name"
                label="First Name"
              />
              <FormFieldText
                control={control}
                name="last_name"
                label="Last Name"
              />

              <FormFieldPassword
                autoComplete="new-password"
                toggleVisibility={true}
                control={control}
                name="password"
                label="Password"
              />

              <div className="flex justify-between gap-4">
                <FormSubmitButton
                  type="submit"
                  disabled={!updateForm.formState.isDirty}
                  isFormLoading={isLoading}
                  isSubmitting={isUpdating}
                  onClick={updateForm.handleSubmit((value) =>
                    mutateUpdate(value)
                  )}
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
                        onClick={() => mutateDelete()}
                        disabled={isDeleting}
                      >
                        {isDeleting ? "Deleting..." : "Delete"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>{" "}
        </form>
      </FormProvider>
    </div>
  );
}
