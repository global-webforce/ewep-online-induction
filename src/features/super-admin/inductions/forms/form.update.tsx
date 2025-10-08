"use client";

import { AlertPanelState } from "@/components/custom/alert-panel-state";
import LoadingButton from "@/components/react-hook-form-reusable/form-submit";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { fetchById } from "../actions/fetch-by-id";
import { updateAction } from "../actions/update-action";
import { formSchema, FormSchema } from "../types/form";
import FormBase from "./form.base";

export function FormUpdate() {
  const { id } = useParams<{ id: string }>();

  const {
    data,
    error,
    refetch,
    isError: isErrorFetch,
  } = useQuery({
    queryKey: [`inductions`, id],
    queryFn: async () => await fetchById(id),
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: FormSchema) => updateAction(id, values),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["inductions"] });
      toast.success("Record has been updated.");
    },
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: data || {
      title: "",
      description: "",
      validity_days: null,
      status: "draft",
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
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormBase />

            <LoadingButton
              type="submit"
              className="w-min"
              disabled={!form.formState.isDirty || isErrorFetch}
              pending={isPending}
            >
              Update
            </LoadingButton>
          </form>
        </FormProvider>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create Presentation</CardTitle>
          <CardDescription>
            Quickly create and customize your presentation slides.
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <Button asChild>
            <Link href={"/dashboard/inductions/" + id + "/resources"}>
              <span>Go to Presentation</span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
