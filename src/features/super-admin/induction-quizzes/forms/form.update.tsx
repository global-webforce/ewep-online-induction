"use client";

import { AlertPanelState } from "@/components/custom/alert-panel-state";
import FormSubmitButton from "@/components/react-hook-form-reusable/form-submit-button";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { deleteAction } from "../actions/delete-action";
import { fetchById } from "../actions/fetch-by-id";
import { updateAction } from "../actions/update-action";
import { formSchema, FormSchema } from "../types/form";
import FormBase from "./form.base";

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

export function FormUpdate() {
  const { quiz_id } = useParams<{ quiz_id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  // 🧠 Fetch data
  const { data, error, refetch, isLoading } = useQuery({
    queryKey: [`induction-quizzes`, quiz_id],
    queryFn: async () => await fetchById(quiz_id),
  });

  // 🧩 Update mutation
  const { mutate, isPending } = useMutation({
    mutationFn: (values: FormSchema) => updateAction(quiz_id, values),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["induction-quizzes"] });
      toast.success("Record has been updated.");
    },
  });

  // 🗑️ Delete mutation
  const { mutate: deleteMutation, isPending: isDeleting } = useMutation({
    mutationFn: async () => await deleteAction(Number(quiz_id)),
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong while deleting.");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["induction-quizzes"] });
      toast.success("Record has been deleted.");
      router.back(); // go back to the list after deletion
    },
  });

  // 🧾 Form
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: data || {
      question: "",
      correct_answer: "",
      induction_id: "",
      options: [{ value: "" }],
    },
    values: data,
  });

  const onSubmit = (values: FormSchema) => mutate(values);

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

            <div className="flex gap-4">
              <FormSubmitButton
                disabled={!form.formState.isDirty}
                isFormLoading={isLoading}
                isSubmitting={isPending}
                onClick={form.handleSubmit(onSubmit)}
              >
                Update
              </FormSubmitButton>

              {/* 🗑️ Delete button with confirmation dialog */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <FormSubmitButton
                    variant="destructive"
                    disabled={!data}
                    type="button"
                  >
                    Delete
                  </FormSubmitButton>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      this quiz record.
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
    </div>
  );
}
