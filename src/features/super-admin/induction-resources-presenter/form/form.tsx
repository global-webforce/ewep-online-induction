"use client";

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
  const answer = watch("answer");

  useEffect(() => {
    if (!isEqual(value, answer) && isDirty) {
      onChange({
        ...value,
        answer: answer,
      } as QuizFormSchema);
    }
  }, [answer]);

  useEffect(() => {
    if (!isEqual(value, answer)) {
      reset(value);
    }
  }, [value]);

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4">
        <Card className="p-6 gap-4">
          <div className="flex gap-1">
            <p className="text-muted-foreground">{`Quiz # ${value.index} :`}</p>
            {answer == value.correctAnswer && (
              <p className="text-green-300">Correct!</p>
            )}
            {answer != value.correctAnswer && answer != "" && (
              <p className="text-red-300">Incorrect!</p>
            )}
          </div>
          <FormFieldCustom
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem key={field.value} className="space-y-3">
                <FormLabel className="text-lg">
                  {getValues("question")}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col"
                  >
                    {getValues("options").map((e, index) => {
                      return (
                        <FormItem
                          key={index + e.value}
                          className="flex items-center gap-3"
                        >
                          <FormControl>
                            <RadioGroupItem value={e.value} />
                          </FormControl>
                          <FormLabel className="font-normal text-md">
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
