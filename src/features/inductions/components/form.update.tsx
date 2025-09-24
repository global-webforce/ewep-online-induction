"use client";

import LoadingButton from "@/components/react-hook-form-reusable/form-submit";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateAction } from "../mutations";
import Form from "./form";
import { formSchema, FormSchema } from "../types";

//https://nextjs.org/docs/14/app/building-your-application/data-fetching/patterns

export function FormUpdate({
  id,
  data,
}: {
  id: string;
  data: FormSchema | undefined;
}) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: FormSchema) => updateAction(id, values),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: [`inductions`, id] });
      await queryClient.invalidateQueries({ queryKey: ["inductions"] });
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
  );
}
