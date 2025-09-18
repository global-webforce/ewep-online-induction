"use client";

import { FormField } from "@/components/react-hook-form-reusable/form-field";
import LoadingButton from "@/components/react-hook-form-reusable/form-submit";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateAction } from "./actions";
import { UpdateRecord, updateSchema } from "./schemas";

export function FormUpdate({ id, data }: { id: string; data: UpdateRecord }) {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: UpdateRecord) => updateAction(id, values),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      router.refresh();
      toast.success("Record has been updated.");
    },
  });

  const form = useForm<UpdateRecord>({
    resolver: zodResolver(updateSchema),
    defaultValues: data,
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
          Update
        </LoadingButton>
      </form>
    </Card>
  );
}
