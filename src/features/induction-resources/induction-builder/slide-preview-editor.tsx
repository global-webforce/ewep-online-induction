"use client";

import TinyMECEditor, {
  wrapIfPlainText,
} from "@/components/custom/tinymce-custom";
import { AlertPanel } from "@/components/custom/alert-panel";
import { FormField } from "@/components/react-hook-form-reusable/form-field";
import { FormField as FormFieldCustom } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { slideSchema, SlideSchema } from "../types";

export default function SlidePreviewEditor({
  value,
  onChange,
}: {
  value: () => SlideSchema;
  onChange: (value: SlideSchema) => void;
}) {
  const { formState, control, getValues, reset, watch } = useForm<SlideSchema>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(slideSchema),
    defaultValues: {
      title: "",
      content: "",
      quiz: undefined,
      order: 0,
      localId: "1a1a1a",
    },
    values: value(),
  });
  const allFormValues = watch();

  useEffect(() => {
    if (!isEqual(value()?.quiz, getValues()) && formState.isDirty) {
      onChange({
        ...value(),
        ...allFormValues,
      } as SlideSchema);
    }
  }, [formState.isDirty, allFormValues, value]);

  useEffect(() => {
    if (!isEqual(value()?.quiz, getValues())) {
      reset(value());
    }
  }, [value]);

  return (
    <div className="">
      {formState.errors.root && (
        <AlertPanel variant="error">
          `${JSON.stringify(formState.errors.root)}`
        </AlertPanel>
      )}

      <form className="flex flex-col gap-4">
        <FormField control={control} type="text" name="title" label="" />

        <FormFieldCustom
          control={control}
          name={"content"}
          render={({ field: { onChange, onBlur, value: val } }) => {
            return (
              <TinyMECEditor
                id={`tiny-editor-${value().localId}`}
                value={wrapIfPlainText(val)}
                onBlur={() => onBlur()}
                onEditorChange={(content, _editor) => {
                  onChange(content);
                }}
              />
            );
          }}
        />
      </form>
    </div>
  );
}
