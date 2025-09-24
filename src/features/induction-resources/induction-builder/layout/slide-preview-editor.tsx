"use client";

import TinyMECEditor from "@/components/custom/tinymce-custom";

import { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { AlertPanel } from "@/components/custom/alert-panel";
import { FormField } from "@/components/react-hook-form-reusable/form-field";
import { FormField as FormFieldCustom } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { slideSchema, SlideSchema } from "../../types";

export default function SlidePreviewEditor({
  slide,
  onChange,
}: {
  slide: SlideSchema | undefined;
  onChange: (slide: SlideSchema) => void;
}) {
  const form = useForm<SlideSchema>({
    resolver: zodResolver(slideSchema),
    defaultValues: slide,
  });
  const { watch } = form;

  useEffect(() => {
    const { unsubscribe } = watch((v) => {
      if (JSON.stringify(slide) !== JSON.stringify(v)) {
        onChange({ ...v } as SlideSchema);
      }
    });
    return () => unsubscribe();
  }, [onChange, watch, form]);

  useEffect(() => {
    form.reset({
      ...slide,
    });
  }, [slide, form]);

  const content = form.watch("content");
  const onSubmit: SubmitHandler<SlideSchema> = async () => {};

  return (
    <div className="p-3">
      {form.formState.errors.root && (
        <AlertPanel variant="error">
          `${JSON.stringify(form.formState.errors.root)}`
        </AlertPanel>
      )}

      <p>${JSON.stringify(slide)}</p>

      <form key={slide?.id} onSubmit={form.handleSubmit(onSubmit)}>
        <Tabs defaultValue="content">
          <TabsList>
            <TabsTrigger className="min-w-30" value="content">
              Content
            </TabsTrigger>
            <TabsTrigger className="min-w-30" value="quiz">
              Question
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="content"
            className="flex flex-col gap-4 pt-3 pb-3"
          >
            <FormField
              control={form.control}
              type="text"
              name="title"
              label="Title"
            />

            {
              <FormFieldCustom
                control={form.control}
                name={"content"}
                render={({ field }) => (
                  <TinyMECEditor
                    value={field.value}
                    id="content-editor"
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                )}
              />
            }
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
