"use client";

import LoadingButton from "@/components/react-hook-form-reusable/form-submit";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateAction } from "../../mutations";
import Form from "./form.base";
import { formSchema, FormSchema } from "../../types";
import { useParams } from "next/navigation";
import { getById } from "../../queries";
import { AlertPanelState } from "@/components/custom/alert-panel-state";
import { Button } from "@/components/ui/button";
import Link from "next/link";

//https://nextjs.org/docs/14/app/building-your-application/data-fetching/patterns

export function FormUpdate() {
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [`inductions`, id],
    queryFn: async () => await getById(id),
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: FormSchema) => updateAction(id, values),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: [`users`, id] });
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Record has been updated.");
      form.reset(data);
    },
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      validity_days: 0,
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

      {isLoading && <AlertPanelState variant="loading" />}
      <Card className="w-full p-4">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Form />

            <LoadingButton
              type="submit"
              className="w-min"
              disabled={!form.formState.isDirty}
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
