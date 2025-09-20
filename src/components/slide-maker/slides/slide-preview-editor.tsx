"use client";

import TinyMECEditor from "@/components/custom/tinymce-custom";

import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Slide, SlideSchema } from "../types";
import { AlertPanel } from "@/components/custom/alert-panel";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@/components/react-hook-form-reusable/form-field";
import { FormField as FormFieldCustom } from "@/components/ui/form";

export default function SlidePreviewEditor({
  slide,
  onChange,
}: {
  slide: Slide;
  onChange: (slide: Slide) => void;
}) {
  const form = useForm<Slide>({
    resolver: zodResolver(SlideSchema),
    defaultValues: slide,
  });

  const { watch, control } = form;

  useEffect(() => {
    form.reset({
      ...slide,
    });
  }, [slide, form]);

  useEffect(() => {
    const { unsubscribe } = watch((v) => {
      onChange({ ...v } as Slide);
    });

    return () => unsubscribe();
  }, [onChange, watch, form]);

  const onSubmit: SubmitHandler<Slide> = async (values) => {};

  return (
    <div className="p-3">
      {form.formState.errors.root && (
        <AlertPanel variant="error">
          `${JSON.stringify(form.formState.errors.root)}`
        </AlertPanel>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Tabs defaultValue="content">
          <TabsList>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="quiz">Question</TabsTrigger>
          </TabsList>
          <TabsContent value="content" className="flex flex-col gap-4">
            <FormField
              control={control}
              type="text"
              name="title"
              label="Title"
            />

            <FormFieldCustom
              control={form.control}
              name={"content"}
              render={({ field }) => (
                <TinyMECEditor
                  id={"dfsfsf"}
                  value={field.value || ""}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
          </TabsContent>
          <TabsContent
            value="quiz"
            className="flex flex-col gap-4 max-w-2xl"
          ></TabsContent>
        </Tabs>
      </form>
    </div>
  );
}
