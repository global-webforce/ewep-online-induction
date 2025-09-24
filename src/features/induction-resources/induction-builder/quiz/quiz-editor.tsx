"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuestionFormSchema, questionSchema } from "../../types";

interface QuizFormProps {
  defaultValues?: QuestionFormSchema;
  onSubmit: (data: QuestionFormSchema) => void;
}

export const QuizForm: React.FC<QuizFormProps> = ({
  defaultValues,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<QuestionFormSchema>({
    resolver: zodResolver(questionSchema),
    defaultValues: defaultValues ?? {
      question: "",
      options: [{ value: "" }, { value: "" }],
      correctAnswer: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options", // now it's an array of objects
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Question */}
      <div>
        <label className="block font-semibold">Question</label>
        <input
          type="text"
          {...register("question")}
          className="border rounded px-2 py-1 w-full"
        />
        {errors.question && (
          <p className="text-red-500 text-sm">{errors.question.message}</p>
        )}
      </div>

      {/* Options */}
      <div>
        <label className="block font-semibold">Options</label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              {...register(`options.${index}.value` as const)}
              className="border rounded px-2 py-1 w-full"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ value: "" })}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          + Add Option
        </button>
        {errors.options && (
          <p className="text-red-500 text-sm">
            {errors.options.message as string}
          </p>
        )}
      </div>

      {/* Correct Answer */}
      <div>
        <label className="block font-semibold">Correct Answer (index)</label>
        <input
          type="number"
          {...register("correctAnswer", { valueAsNumber: true })}
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Save Quiz
      </button>
    </form>
  );
};
