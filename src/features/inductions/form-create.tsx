"use client";

import { FormField } from "@/components/react-hook-form-reusable/form-field";
import LoadingButton from "@/components/react-hook-form-reusable/form-submit";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createAction } from "./actions";
import { CreateRecord, createSchema } from "./schemas";

export function FormCreate() {
  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateRecord) => createAction(values),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Record has been created.");
      form.reset();
    },
  });

  const form = useForm<CreateRecord>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      title: "",
      description: "",
      validity_days: 0,
    },
  });

  return (
    <Card className="w-full p-4">
      <form
        onSubmit={form.handleSubmit((values) => mutate(values))}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          type="text"
          name="title"
          label="Title"
        />
        <FormField
          control={form.control}
          type="text"
          name="description"
          label="Description"
        />
        <FormField
          control={form.control}
          type="number"
          name="validity_days"
          label="Validity"
        />
        <LoadingButton
          type="submit"
          className="w-min"
          disabled={!form.formState.isDirty}
          pending={isPending}
        >
          Create
        </LoadingButton>
      </form>
    </Card>
  );
}
