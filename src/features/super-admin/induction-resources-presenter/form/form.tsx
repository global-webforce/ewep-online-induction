"use client";

import { FormField } from "@/components/react-hook-form-reusable/form-field";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField as FormFieldCustom,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { quizSchema } from "../../induction-resources-builder";
import { QuizFormSchema } from "../types/quiz";
import { TextAreaInput } from "@/components/react-hook-form-reusable/text-area-input";
export default function FormComponent({
  value,
  onChange,
}: {
  value: QuizFormSchema;
  onChange: (value: QuizFormSchema) => void;
}) {
  const form = useForm<QuizFormSchema>({
    mode: "onChange",
    resolver: zodResolver(quizSchema),
    defaultValues: value || {
      question: "",
      correctAnswer: "",
      answer: "",
      options: [],
    },
    values: value,
  });

  const {
    formState: { isDirty },
    control,
    watch,
    reset,
    getValues,
  } = form;
  const data = watch("answer");

  useEffect(() => {
    if (!isEqual(value, data) && isDirty) {
      onChange({
        ...value,
        answer: data,
      } as QuizFormSchema);
    }
  }, [data]);

  useEffect(() => {
    if (!isEqual(value, data)) {
      reset(value);
    }
  }, [value]);

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4">
        <Card className="p-4 gap-4">
          <div className="flex flex-col gap-4">
            <TextAreaInput
              control={control}
              name={"question"}
              label="Question"
              placeholder="Quiz Question"
              readOnly
            />
          </div>

          <FormFieldCustom
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem key={field.value} className="space-y-3">
                <FormLabel>Choose correct answer</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col"
                  >
                    {getValues("options").map((e) => {
                      return (
                        <FormItem className="flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem value={e.value} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {e.value}
                          </FormLabel>
                        </FormItem>
                      );
                    })}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>
      </form>
    </Form>
  );
}
