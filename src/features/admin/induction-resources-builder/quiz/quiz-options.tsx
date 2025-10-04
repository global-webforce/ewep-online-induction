import { FormField } from "@/components/react-hook-form-reusable/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { QuizFormSchema } from "../types/form";
export default function QuizOptions() {
  const { control } = useFormContext<QuizFormSchema>();

  const { fields, append, remove } = useFieldArray<
    QuizFormSchema,
    "options",
    "id"
  >({
    name: "options",
    keyName: "id",
    control: control,
    shouldUnregister: true,
  });

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-2">
        <Label>Correct Answer</Label>
        <FormField
          control={control}
          name="correctAnswer"
          placeholder="Select the correct answer from options"
          type="text"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Other Options (exclude correct answer)</Label>
        {fields.map((opt, optionIndex) => (
          <div
            key={optionIndex}
            className="flex w-full gap-2 items-start justify-between"
          >
            <div className="w-full">
              <Controller
                name={`options.${optionIndex}.value`}
                control={control}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1.5">
                    <Input
                      {...field}
                      placeholder={`Option ${optionIndex + 1}`}
                    />
                    {fieldState.error && (
                      <p className="text-sm text-red-500">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => remove(optionIndex)}
              disabled={fields.length <= 2} // minimum 2 options
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
    </div>
  );
}
