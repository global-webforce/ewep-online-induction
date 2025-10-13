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
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormSchema, formSchema } from "../types";
export default function FormComponent({
  value,
  onChange,
}: {
  value: FormSchema;
  onChange: (value: FormSchema) => void;
}) {
  const form = useForm<FormSchema>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: value || {
      question: "",
      correctAnswer: "",
      answer: "",
      options: [{ value: "" }],
    },
    values: value,
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
      } as FormSchema);
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
