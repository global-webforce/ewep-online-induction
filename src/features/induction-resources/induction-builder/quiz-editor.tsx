import { FormField } from "@/components/react-hook-form-reusable/form-field";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { useEffect } from "react";
import { QuizFormSchema, quizSchema, SlideSchema } from "../types";

export const QuizForm = ({
  value,
  onChange,
}: {
  value: SlideSchema;
  onChange: (value: SlideSchema) => void;
}) => {
  const quiz = value.quiz as QuizFormSchema;

  const {
    formState: { errors, isDirty, isLoading },
    trigger,
    control,
    getValues,
    reset,
    watch,
    handleSubmit,
    setValue,
  } = useForm<QuizFormSchema>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(quizSchema),
    values: quiz,
    defaultValues: {
      question: "",
      correctAnswer: undefined,
      answer: "",
      options: [
        { value: "Option 1" },
        { value: "Option 2" },
        { value: "Option 3" },
        { value: "Option 4" },
      ],
    },
  });
  const allFormValues = watch();
  useEffect(() => {
    if (!isEqual(value?.quiz, getValues()) && isDirty) {
      onChange({
        ...value,
        quiz: allFormValues,
      } as SlideSchema);
    }
  }, [isDirty, allFormValues, value]);

  useEffect(() => {
    if (!isEqual(value?.quiz, getValues())) {
      reset(quiz);
    }
  }, [value]);

  //----------------------------------
  const {
    fields: options,
    append,
    remove,
  } = useFieldArray<QuizFormSchema, "options", "idx">({
    name: "options",
    keyName: "idx",
    control: control,
    shouldUnregister: false,
  });
  const watchCorrectAnswer = watch("correctAnswer");
  const watchOptions = watch("options");
  const quizError = errors;

  return (
    <form className="flex flex-col gap-4">
      <div className="mt-3 space-y-3">
        <div className="space-y-2">
          <FormField
            control={control}
            type="text"
            name={"question"}
            label="Question"
            placeholder="Quiz Question"
          />
        </div>
        <FormField
          label="Correct Answer"
          placeholder="Correct Answer"
          control={control}
          type="text"
          name={"correctAnswer"}
          readOnly={true}
        />

        <RadioGroup
          value={watchCorrectAnswer}
          onValueChange={(e) => setValue("correctAnswer", e)}
        >
          <div className="flex flex-col space-y-3">
            {watchOptions.map((opt, optionIndex) => (
              <div
                key={optionIndex}
                className="flex  w-full  gap-2 items-center align-middle justify-between"
              >
                <RadioGroupItem value={opt.value} id={String(optionIndex)} />
                <div className="w-full">
                  <FormField
                    control={control}
                    type="text"
                    name={`options.${optionIndex}.value`}
                    placeholder={`Option ${optionIndex + 1}`}
                  />
                </div>

                <Button
                  disabled={true}
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => {
                    remove(optionIndex);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </RadioGroup>

        <Button
          disabled={true}
          type="button"
          variant="secondary"
          onClick={() =>
            append({
              value: `Option ${
                watchOptions &&
                watchOptions?.filter((opt) => opt.value !== undefined).length +
                  1
              }`,
            })
          }
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Append Option
        </Button>

        {quizError?.options && (
          <p className="text-sm text-red-500">
            {quizError?.options?.message || quizError?.options?.root?.message}
          </p>
        )}
      </div>
    </form>
  );
};
