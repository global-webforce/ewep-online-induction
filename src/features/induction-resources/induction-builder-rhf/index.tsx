"use client";
import TinyMECEditor from "@/components/custom/tinymce-custom";
import LoadingButton from "@/components/react-hook-form-reusable/form-submit";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormField as FormFieldCustom } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getInductionById } from "@/features/inductions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueries } from "@tanstack/react-query";
import { Plus, Redo, Trash2, Undo } from "lucide-react";
import { useNavigationGuard } from "next-navigation-guard";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Controller,
  FieldArrayWithId,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";

import { AlertPanel } from "@/components/custom/alert-panel";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import z from "zod";
import { getInductionResourcesById } from "../queries";

import ActionBar from "./slide/action-bar";
import CopyButton from "./slide/copy-button";
import DeleteButton from "./slide/delete-button";
import MoveButton from "./slide/move-button";
import QuizFlag from "./slide/quiz-flag";
import SlideItem from "./slide/slide";
import Thumbnail from "./slide/thumbnail";
import { stripHtml } from "./utils";
import { SlideScrollableList } from "./slide-list";
import { FormField } from "@/components/react-hook-form-reusable/form-field";
import { sampleSlides } from "./sample";

// ----------------- Schemas -----------------
const quizSchema = z.object({
  question: z.string().min(1, "Question is required"),
  options: z
    .array(z.object({ value: z.string().min(1, "Option cannot be empty") }))
    .min(2, "At least 2 options required"),
  correctAnswer: z
    .number()
    .int()
    .nonnegative({ message: "Correct answer is required" })
    .refine((val) => val !== undefined && val !== null, {
      message: "Correct answer is required",
    }),
  answer: z.number().int().optional(),
});

const slideSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  content: z.string().optional(),
  enableQuiz: z.boolean().optional(),
  quiz: quizSchema.optional(),
  quizCache: quizSchema.optional(),
});

const formSchema = z.object({
  slides: z.array(slideSchema),
});
type QuizOption = z.infer<typeof quizSchema>["options"][number];
export type FormValue = z.infer<typeof slideSchema>;

export type FormValues = z.infer<typeof formSchema>;

type QuizOptionsProps = {
  slideIndex: number;
};

type HistoryEntry = {
  slides: FormValue[];
  index: number;
};

type TabType = "content" | "quiz";

const QuizOptions = ({ slideIndex }: QuizOptionsProps) => {
  const { register, control, formState } = useFormContext<FormValues>();
  const {
    fields: options,
    append,
    remove,
  } = useFieldArray<FormValues, `slides.${number}.quiz.options`, "id">({
    name: `slides.${slideIndex}.quiz.options`,
    shouldUnregister: false,
  });
  const quizError = formState.errors?.slides?.[slideIndex]?.quiz;
  return (
    <div className="mt-3 space-y-3">
      <div className="space-y-2">
        <FormField
          control={control}
          type="text"
          name={`slides.${slideIndex}.quiz.question`}
          label="Question*"
          placeholder="Quiz Question"
        />
      </div>
      <Card className="p-0">
        <CardContent className="space-y-3 p-3">
          {options.filter((obj) => JSON.stringify(obj) !== "{}").length > 0 && (
            <div className="space-y-3">
              <Label>Options* (atleast 2)</Label>

              <Controller
                control={control}
                name={`slides.${slideIndex}.quiz.correctAnswer`}
                render={({ field }) => (
                  <>
                    <RadioGroup
                      value={String(field.value)}
                      onValueChange={(val) => field.onChange(Number(val))}
                      className="gap-3"
                    >
                      {options
                        .filter((obj) => JSON.stringify(obj) !== "{}")
                        .map((opt, optionIndex) => (
                          <div key={opt.id} className="flex items-start gap-2">
                            <Button asChild>
                              <RadioGroupItem
                                value={String(optionIndex)}
                                id={`slide-${slideIndex}-option-${optionIndex}`}
                                className="text-4xl"
                              />
                            </Button>

                            <FormField
                              control={control}
                              type="text"
                              name={`slides.${slideIndex}.quiz.options.${optionIndex}.value`}
                              placeholder="Question"
                            />

                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={() => {
                                if (field.value === optionIndex) {
                                  field.onChange(Number(optionIndex - 1));
                                }
                                remove(optionIndex);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                    </RadioGroup>
                  </>
                )}
              />
            </div>
          )}

          {quizError?.correctAnswer && (
            <p className="text-sm text-red-500">
              {quizError?.correctAnswer?.message ||
                quizError?.correctAnswer?.root?.message}
            </p>
          )}

          {quizError?.options && (
            <p className="text-sm text-red-500">
              {quizError?.options?.message || quizError?.options?.root?.message}
            </p>
          )}

          <Button
            type="button"
            variant="secondary"
            onClick={() => append({ value: "" })}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Append Option
          </Button>
        </CardContent>
      </Card>{" "}
    </div>
  );
};
const onSubmit: SubmitHandler<FormValues> = (data) =>
  console.log(JSON.stringify(data));

export default function SlideMaker() {
  const { id } = useParams<{ id: string }>();

  const [inductionQuery, inductionSlidesQuery] = useQueries({
    queries: [
      {
        queryKey: [`inductions`, id],
        queryFn: async () => await getInductionById(id),
      },

      {
        queryKey: [`inductions-resources`, id],
        queryFn: async () => await getInductionResourcesById(id),
      },
    ],
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: sampleSlides || {
      slides: [
        {
          title: "",
          content: "",
          quiz: undefined,
        },
      ],
    },
    //values: sampleSlides,
    shouldUnregister: false,
  });

  const undoStack = useRef<HistoryEntry[]>([]);
  const redoStack = useRef<HistoryEntry[]>([]);
  const tabView = useRef<TabType>("content");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const { control, handleSubmit, register, watch, formState, unregister } =
    form;

  const {
    fields: slides,
    append,
    prepend,
    remove,
    swap,
    move,
    insert,
    replace,
    update,
  } = useFieldArray({
    control,
    name: "slides",
    keyName: "customId", //prevents rhf from overriding our id prop,
    shouldUnregister: false,
  });

  const watchSlides = watch("slides");

  type MergedSlide = FieldArrayWithId<FormValues, "slides", "customId"> &
    FormValues["slides"][number];

  const mergedSlides: MergedSlide[] = slides.map(
    (field: MergedSlide, index: number) => ({
      ...field,
      ...watchSlides?.[index],
    })
  );
  function selectSlide(index: number) {
    setCurrentIndex(index);
  }

  function appendSlide() {
    writeHistory();
    insert(currentIndex + 1, {
      title: "",
      content: "",
      quiz: undefined,
    });

    setCurrentIndex(currentIndex + 1);
  }

  function moveUpSlide(from: number) {
    if (from - 1 <= -1) return;
    writeHistory();
    swap(from, from - 1);
    setCurrentIndex(from - 1);
  }

  function moveDownSlide(from: number) {
    if (
      from + 1 >
        mergedSlides.filter((obj) => JSON.stringify(obj) !== "{}").length -
          1 ===
      true
    )
      return;
    writeHistory();
    swap(from, from + 1);

    setCurrentIndex(from + 1);
  }

  function deleteSlide(index: number) {
    writeHistory();
    remove(index);
    if (index === currentIndex) {
      setCurrentIndex(Math.max(0, index - 1));
    } else if (index < currentIndex) {
      setCurrentIndex((prev) => prev - 1);
    }
  }

  function copySlide(index: number) {
    writeHistory();
    insert(index + 1, { ...mergedSlides[index] });
    setCurrentIndex(index + 1);
  }

  function writeHistory() {
    undoStack.current.push({ index: currentIndex, slides: mergedSlides });
  }

  function undo() {
    redoStack.current.push({
      index: currentIndex,
      slides: mergedSlides!,
    });
    const lastCommit = undoStack.current.at(-1);
    if (lastCommit) {
      replace(lastCommit.slides);
      setCurrentIndex(lastCommit.index);
      undoStack.current.pop();
    }
  }

  function redo() {
    undoStack.current.push({ index: currentIndex, slides: mergedSlides });
    const lastCommit = redoStack.current.at(-1);
    if (lastCommit) {
      replace(lastCommit.slides);
      setCurrentIndex(lastCommit.index);
      redoStack.current.pop();
    }
  }

  function isEmpty(obj: Record<string, unknown>): boolean {
    return Object.keys(obj).length === 0;
  }

  const watchSlide = mergedSlides[currentIndex];

  useEffect(() => {
    inputRefs.current[currentIndex]?.focus();
  }, [currentIndex]);

  const confirmExit = useNavigationGuard({
    enabled: form.formState.isDirty,
    confirm: undefined,
  });

  const [loading] = useState<boolean>(false);
  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Dialog open={confirmExit.active}>
            <DialogContent showCloseButton={false}>
              <DialogHeader>
                <DialogTitle>You have unsaved changes</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                You have unsaved changes that will be lost.
              </DialogDescription>
              <DialogFooter>
                <DialogClose asChild>
                  <Button onClick={confirmExit.reject} variant="outline">
                    Cancel
                  </Button>
                </DialogClose>

                <Button onClick={confirmExit.accept}>Discard</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <div className="flex flex-col h-auto">
            <div className="flex flex-1">
              <div className="w-[25%] min-h-96">
                <div className=" p-3 border-1 border-b-0">
                  <Button
                    type="button"
                    onClick={() => appendSlide()}
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Slide
                  </Button>
                </div>

                <SlideScrollableList>
                  {slides
                    .filter((obj) => JSON.stringify(obj) !== "{}")
                    .map((slide, index: number) => {
                      return (
                        <SlideItem
                          key={slide?.customId}
                          isActive={index === currentIndex}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            selectSlide(index);
                          }}
                        >
                          <Thumbnail>
                            <h1 className="font-semibold ">
                              {mergedSlides[index].title || ""}
                            </h1>

                            <p className="text-sm text-muted-foreground truncate max-w-[250px]">
                              {stripHtml(mergedSlides[index].content || "")}
                            </p>
                          </Thumbnail>
                          <ActionBar isActive={index === currentIndex}>
                            <div className="flex items-center  m-2 text-white gap-2">
                              <span>{`${index + 1}`}</span>

                              {mergedSlides[index].quiz && (
                                <QuizFlag
                                  hasProblem={
                                    quizSchema.safeParse(slide.quiz).error !==
                                    undefined
                                  }
                                />
                              )}
                            </div>

                            <div className="flex justify-end space-x-2">
                              {mergedSlides.filter(
                                (obj) => JSON.stringify(obj) !== "{}"
                              ).length > 1 && (
                                <DeleteButton
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteSlide(index);
                                  }}
                                />
                              )}
                              <CopyButton
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copySlide(index);
                                }}
                              />
                              {index !== 0 && (
                                <MoveButton
                                  direction="up"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    moveUpSlide(index);
                                  }}
                                />
                              )}

                              {index !==
                                mergedSlides.filter(
                                  (obj) => JSON.stringify(obj) !== "{}"
                                ).length -
                                  1 && (
                                <MoveButton
                                  direction="down"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    moveDownSlide(index);
                                  }}
                                />
                              )}
                            </div>
                          </ActionBar>
                        </SlideItem>
                      );
                    })}
                </SlideScrollableList>
              </div>
              <div className="w-[75%] flex flex-col ">
                <div className="p-3 border-t-1 border-r-1 flex justify-between">
                  <div className="flex space-x-2 items-center">
                    <Button
                      type="button"
                      disabled={undoStack.current.length == 0}
                      size={"icon"}
                      onClick={() => undo()}
                    >
                      <Undo />
                    </Button>
                    <Button
                      type="button"
                      disabled={redoStack.current.length == 0}
                      size={"icon"}
                      onClick={() => redo()}
                    >
                      <Redo />
                    </Button>
                    <LoadingButton
                      type="submit"
                      disabled={form.formState.isDirty === false}
                      pending={loading}
                    >
                      Save Changes
                    </LoadingButton>
                  </div>
                </div>
                <div className="h-full border-1 p-4">
                  <Tabs
                    key={slides[currentIndex]?.customId}
                    defaultValue={tabView.current}
                    className="gap-3"
                    onValueChange={(value: string) => {
                      tabView.current =
                        (value as "content" | "quiz") || "content";
                    }}
                  >
                    <TabsList>
                      <TabsTrigger className="min-w-30" value="content">
                        Content
                      </TabsTrigger>
                      <TabsTrigger className="min-w-30" value="quiz">
                        Question
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="content">
                      {formState.errors.root && (
                        <AlertPanel variant="error">
                          `${JSON.stringify(formState.errors.root)}`
                        </AlertPanel>
                      )}

                      <Card className="border p-4 gap-3">
                        <div className="space-y-2">
                          <Input
                            {...register(`slides.${currentIndex}.title`)}
                            ref={(el) => {
                              register(`slides.${currentIndex}.title`).ref(el);
                              inputRefs.current[currentIndex] = el;
                            }}
                            placeholder="Slide Title"
                          />
                        </div>

                        <div className="space-y-2">
                          <FormFieldCustom
                            control={control}
                            name={`slides.${currentIndex}.content`}
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
                        </div>
                      </Card>
                    </TabsContent>
                    <TabsContent
                      value="quiz"
                      className="flex flex-col gap-4 max-w-2xl"
                    >
                      <Card className="border p-4 gap-3">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="airplane-mode"
                            checked={watchSlide.enableQuiz}
                            className="data-[state=checked]:bg-amber-500 "
                            onCheckedChange={(e) => {
                              if (e) {
                                update(currentIndex, {
                                  ...mergedSlides[currentIndex],
                                  enableQuiz: e,
                                  quiz: mergedSlides[currentIndex]
                                    .quizCache ?? {
                                    question: "",
                                    options: [],
                                    correctAnswer: 0,
                                  },
                                });
                              } else {
                                update(currentIndex, {
                                  ...mergedSlides[currentIndex],
                                  enableQuiz: e,
                                  quizCache: mergedSlides[currentIndex].quiz,
                                  quiz: undefined,
                                });
                                unregister(`slides.${currentIndex}.quiz`);
                              }
                            }}
                          />
                          <Label htmlFor="airplane-mode">Add Quiz</Label>
                        </div>
                        {watchSlide.enableQuiz == true && (
                          <QuizOptions slideIndex={currentIndex} />
                        )}
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
