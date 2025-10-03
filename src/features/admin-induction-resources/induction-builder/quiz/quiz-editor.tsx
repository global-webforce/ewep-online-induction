import { FormField } from "@/components/react-hook-form-reusable/form-field";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { QuizFormSchema, quizSchema, SlideSchema } from "../../types";
import QuizOptions from "./quiz-options";

export const QuizForm = ({
  value,
  onChange,
}: {
  value: SlideSchema;
  onChange: (value: SlideSchema) => void;
}) => {
  const quiz = value.quiz as QuizFormSchema;
  const form = useForm<QuizFormSchema>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(quizSchema),

    defaultValues: quiz || {
      question: "",
      correctAnswer: "",
      answer: "",
      options: [{ value: "" }, { value: "" }],
    },
    values: quiz,
  });
  const {
    formState: { errors, isDirty },
    control,
    getValues,
    reset,
    watch,
  } = form;

  const watchValues = watch();

  useEffect(() => {
    if (!isEqual(value?.quiz, getValues()) && isDirty) {
      onChange({
        ...value,
        quiz: getValues(),
      } as SlideSchema);
    }
  }, [isDirty, value, getValues, onChange, watchValues]);

  useEffect(() => {
    if (!isEqual(value?.quiz, getValues())) {
      reset(quiz);
    }
  }, [value, getValues, reset, quiz]);

  //----------------------------------

  const quizError = errors;

  return (
    <form className="w-full">
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <FormField
            control={control}
            type="text"
            name={"question"}
            label="Question"
            placeholder="Quiz Question"
          />
        </div>
        <FormProvider {...form}>
          <QuizOptions />
        </FormProvider>

        {quizError?.options && (
          <p className="text-sm text-red-500">
            {quizError?.options?.message || quizError?.options?.root?.message}
          </p>
        )}
      </div>
    </form>
  );
};
