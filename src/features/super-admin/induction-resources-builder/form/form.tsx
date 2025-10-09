"use client";

import { Switch } from "@/components/custom/switch-custom";
import { FormField } from "@/components/react-hook-form-reusable/form-field";
import TinyMECEditor from "@/components/tinyMCE/tinymce-custom";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField as FormFieldCustom,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formSchema, FormSchema } from "../types/form";
import { QuizForm } from "./quiz-form";
export default function FormComponent({
  value,
  onChange,
}: {
  value: FormSchema;
  onChange: (value: FormSchema) => void;
}) {
  const form = useForm<FormSchema>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: value || {
      question: "",
      correctAnswer: "",
      answer: "",
      options: [{ value: "" }],
    },
    values: value,
  });

  const {
    formState: { isDirty },
    control,
    watch,
    reset,
    setValue,
    getValues,
  } = form;
  const data = watch();

  useEffect(() => {
    if (!isEqual(value, data) && isDirty) {
      onChange({
        ...value,
        ...data,
      } as FormSchema);
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
        <Tabs defaultValue="content">
          <TabsList>
            <TabsTrigger className="min-w-30" value="content">
              Content
            </TabsTrigger>
            <TabsTrigger className="min-w-30" value="quiz">
              Quiz
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="content"
            className="flex flex-col gap-4 pt-3 pb-3"
          >
            <FormField control={control} type="text" name="title" label="" />

            <FormFieldCustom
              control={control}
              name={"content"}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <TinyMECEditor
                        value={field.value || undefined}
                        onInitialValue={(normalisedContent) => {
                          value.content = normalisedContent;
                          //  setValue("content", normalisedContent);
                          reset((prev) => ({
                            ...prev,
                            content: normalisedContent,
                          }));
                        }}
                        onEditorChange={(value) => {
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </TabsContent>
          <TabsContent
            value="quiz"
            className="flex flex-col gap-4 pt-3 pb-3 max-w-xl"
          >
            <FormProvider {...form}>
              <Card className="flex flex-row gap-4 p-3 ">
                <FormFieldCustom
                  control={control}
                  name={"enableQuiz"}
                  render={({ field }) => {
                    return (
                      <>
                        <Switch
                          checked={field.value === true ? true : false}
                          onCheckedChange={(e) => {
                            if (e) {
                              setValue(
                                "quiz",
                                getValues("quizCache") || {
                                  question: "",
                                  correctAnswer: "",
                                  answer: "",
                                  options: [{ value: "" }, { value: "" }],
                                }
                              );
                            } else {
                              setValue("quizCache", getValues("quiz"));
                              setValue("quiz", null);
                            }
                            field.onChange(e);
                          }}
                        />{" "}
                        <Label htmlFor="airplane-mode">Enable Quiz</Label>
                      </>
                    );
                  }}
                />
              </Card>
              {data.enableQuiz && <QuizForm />}
            </FormProvider>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
}
