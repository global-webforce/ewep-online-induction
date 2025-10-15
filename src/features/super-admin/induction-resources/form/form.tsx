"use client";

import { FormFieldText } from "@/components/react-hook-form-reusable";
import TinyMECEditor from "@/components/tinyMCE/tinymce-custom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { resourceFormSchema, ResourceFormSchema } from "@/features/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function FormComponent({
  value,
  onChange,
}: {
  value: ResourceFormSchema;
  onChange: (value: ResourceFormSchema) => void;
}) {
  const form = useForm<ResourceFormSchema>({
    resolver: zodResolver(resourceFormSchema),
    mode: "onChange",

    defaultValues: value || {
      title: "",
      content: "",
      induction_id: "",
      order: 0,
      local_id: "d",
    },
  });

  const {
    formState: { isDirty },
    control,
    watch,
    reset,
  } = form;
  const data = watch();

  useEffect(() => {
    if (!isEqual(value, data) && isDirty) {
      onChange({
        ...value,
        ...data,
      } as ResourceFormSchema);
    }
  }, [data]);

  useEffect(() => {
    if (!isEqual(value, data)) {
      reset(value);
    }
  }, [value]);

  return (
    <Form {...form}>
      <form className="space-y-4">
        <div className="flex flex-col gap-4">
          <FormFieldText control={control} name="title" label="" />

          <FormField
            control={control}
            name={"content"}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <TinyMECEditor
                      value={field.value || undefined}
                      onInitialValue={(normalisedContent) => {
                        value.content = normalisedContent;
                        reset((prev) => ({
                          ...prev,
                          content: normalisedContent,
                        }));
                      }}
                      onEditorChange={(value) => {
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
      </form>
    </Form>
  );
}
