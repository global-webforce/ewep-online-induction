import {
  FormFieldHidden,
  FormFieldText,
  FormFieldTextArea,
} from "@/components/react-hook-form-reusable/";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { QuizFormSchema } from "@/features/types";

import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function FormBase() {
  const { formState, control } = useFormContext<QuizFormSchema>();

  const { fields, append, remove } = useFieldArray<
    QuizFormSchema,
    "options",
    "id"
  >({
    name: "options",
    keyName: "id",
    control: control,
    shouldUnregister: true, // keep false for hiding quiz form
  });

  return (
    <>
      <FormFieldHidden control={control} name={"induction_id"} />

      <div className="flex flex-col gap-4">
        <FormFieldTextArea
          control={control}
          name={"question"}
          label="Question"
          placeholder="Quiz Question"
        />
      </div>

      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2">
          <Label>Correct Answer</Label>
          <FormFieldText
            control={control}
            name="correct_answer"
            placeholder="Select the correct answer from options"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Other Options (exclude correct answer)</Label>
          <div className="flex flex-col gap-2">
            {fields.map((opt, optionIndex) => (
              <div
                key={optionIndex}
                className="flex w-full gap-2 items-start justify-between"
              >
                <div className="w-full">
                  <FormFieldText
                    name={`options.${optionIndex}.value`}
                    control={control}
                    className="w-full"
                    placeholder={`Option ${optionIndex + 1}`}
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => remove(optionIndex)}
                  disabled={fields.length <= 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex gap-2 justify-between">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="mt-2 self-start"
              onClick={() => append({ value: "" })}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Option
            </Button>
          </div>

          {formState.errors.options?.root?.message && (
            <FormMessage>{formState.errors.options?.root?.message}</FormMessage>
          )}
        </div>
      </div>
    </>
  );
}
