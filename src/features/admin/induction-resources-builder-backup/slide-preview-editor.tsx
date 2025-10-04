"use client";
import { AlertPanel } from "@/components/custom/alert-panel";
import TinyMECEditor from "@/components/custom/tinymce-custom";
import { FormField } from "@/components/react-hook-form-reusable/form-field";
import {
  Form,
  FormControl,
  FormField as FormFieldCustom,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { formSchema, FormSchema } from "./types/form";

export default function SlidePreviewEditor({
  value,
  onChange,
}: {
  value: FormSchema;
  onChange: (value: FormSchema) => void;
}) {
  const form = useForm<FormSchema>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: value,
    values: value,
  });
  const { formState, control, getValues, reset, watch } = form;

  const watchValues = watch();

  useEffect(() => {
    if (!isEqual(value, getValues()) && formState.isDirty) {
      onChange({
        ...value,
        ...getValues(),
      } as FormSchema);
    }
  }, [formState.isDirty, value, getValues, onChange, watchValues]);

  useEffect(() => {
    if (!isEqual(value?.quiz, getValues())) {
      reset(value);
    }
  }, [value, getValues, reset]);

  return (
    <div className="">
      {formState.errors.root && (
        <AlertPanel variant="error">
          `${JSON.stringify(formState.errors.root)}`
        </AlertPanel>
      )}

      <Form key={value.localId} {...form}>
        <form className="flex flex-col gap-4">
          <FormField control={control} type="text" name="title" label="" />

          <FormFieldCustom
            control={form.control}
            name={"content"}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <TinyMECEditor
                      id={`editor-${value.localId}`}
                      apiKey="nh02gna9iklugsf1ygr50mi8ra9tmeswjj9u7cpo6jin8veq"
                      value={field.value || ""}
                      onEditorChange={(x) => {
                        field.onChange(x);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </form>
      </Form>
    </div>
  );
}
