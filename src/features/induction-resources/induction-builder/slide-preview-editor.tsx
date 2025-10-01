"use client";

import { AlertPanel } from "@/components/custom/alert-panel";
import TinyMECEditor, {
  wrapIfPlainText,
} from "@/components/custom/tinymce-custom";
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
  value: SlideSchema;
  onChange: (value: SlideSchema) => void;
}) {
  const { formState, control, getValues, reset } = useForm<SlideSchema>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(slideSchema),
    defaultValues: {
      title: "",
      content: "",
      localId: "",
      quiz: null,
      enableQuiz: false,
      quizCache: null,
    },
    values: value,
  });

  useEffect(() => {
    if (!isEqual(value, getValues()) && formState.isDirty) {
      onChange({
        ...value,
        ...getValues(),
      } as SlideSchema);
    }
  }, [formState.isDirty, , value, getValues, onChange]);

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

      <form className="flex flex-col gap-4">
        <FormField control={control} type="text" name="title" label="" />

        <FormFieldCustom
          control={control}
          name={"content"}
          render={({ field: { onChange, value: val } }) => {
            return (
              <TinyMECEditor
                id={`tiny-editor-${value.localId}`}
                value={val || ""}
                onEditorChange={(value, _editor) => {
                  onChange(value);
                }}
              />
            );
          }}
        />
      </form>
    </div>
  );
}
