"use client";

import LoadingButton from "@/components/react-hook-form-reusable/form-submit";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { createAction } from "../../mutations";
import Form from "./form.base";
import { formSchema, FormSchema } from "../../types";

export function FormCreate() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: FormSchema) => createAction(values),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["inductions"] });
      toast.success("Record has been created.");
      router.replace("/dashboard/inductions/" + data.id);
    },
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
    },
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
            Create
          </LoadingButton>
        </form>
      </FormProvider>
    </Card>
  );
}
