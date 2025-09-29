"use client";

import LoadingButton from "@/components/react-hook-form-reusable/form-submit";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Redo, Undo } from "lucide-react";
import { useState } from "react";
import { quizSchema, SlideSchema, TableSchema } from "../types";

import { SlideScrollableList } from "./layout/slide-list";

import ExitDialog from "./exit-dialog";
import { QuizForm } from "./quiz-editor";
import QuizToggle from "./quiz-toggle";
import SlidePreviewEditor from "./slide-preview-editor";
import ActionBar from "./slide/action-bar";
import CopyButton from "./slide/copy-button";
import DeleteButton from "./slide/delete-button";
import MoveButton from "./slide/move-button";
import QuizFlag from "./slide/quiz-flag";
import SlideItem from "./slide/slide";
import Thumbnail from "./slide/thumbnail";
import { useSlideController } from "./use-slide-controller";
import { stripHtml } from "./utils";
import { InductionSchema } from "@/features/inductions";

export default function SlideMaker({
  induction,
  value,
}: {
  induction: InductionSchema | undefined;
  value: TableSchema[] | undefined;
}) {
  const {
    slides,
    undoStack,
    redoStack,
    selectedSlide,
    selectedId,
    selectedIndex,
    setSelectedId,
    updateSlide,
    isDirty,
    addSlide,
    deleteSlide,
    copySlide,
    moveSlide,
    undo,
    redo,
  } = useSlideController(value);

  const [loading] = useState<boolean>(false);

  const slideItems = () => {
    return (
      slides &&
      slides.length > 0 &&
      slides.map((slide: SlideSchema, index: number) => (
        <SlideItem
          key={`slide-item-${slide?.localId}`}
          isActive={slide.localId === selectedId}
          onClick={() => {
            setSelectedId(slide.localId);
          }}
        >
          <Thumbnail>
            <h1 className="font-semibold ">{slide.title || ""}</h1>

            <p className="text-sm text-muted-foreground truncate max-w-[250px]">
              {stripHtml(slide.content || "")}
            </p>
          </Thumbnail>
          <ActionBar isActive={slide.localId === selectedId}>
            <div className="flex items-center  m-2 text-white gap-2">
              <span>{`${index + 1}`}</span>
              <QuizFlag
                hasProblem={
                  slide.quiz !== undefined &&
                  quizSchema.safeParse(slide.quiz).error &&
                  Object.keys(quizSchema.safeParse(slide.quiz).error!)
                    .length === 0
                }
              />
            </div>

            <div className="flex justify-end gap-2">
              {
                <DeleteButton
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSlide(index);
                  }}
                />
              }
              <CopyButton
                onClick={(e) => {
                  e.stopPropagation();
                  copySlide(index);
                }}
              />
              {
                <MoveButton
                  direction="up"
                  onClick={(e) => {
                    e.stopPropagation();
                    moveSlide("up", index);
                  }}
                />
              }

              {
                <MoveButton
                  direction="down"
                  onClick={(e) => {
                    e.stopPropagation();
                    moveSlide("down", index);
                  }}
                />
              }
            </div>
          </ActionBar>
        </SlideItem>
      ))
    );
  };

  const topActionBar = () => {
    return (
      <div className="flex gap-2 p-3 border-b-1 items-center justify-between ">
        <h1 className="text-xl font-bold">{induction?.title}</h1>
        <div className="flex gap-2">
          <Button
            disabled={undoStack.length == 0}
            size={"icon"}
            onClick={() => undo()}
          >
            <Undo />
          </Button>
          <Button
            disabled={redoStack.length == 0}
            size={"icon"}
            onClick={() => redo()}
          >
            <Redo />
          </Button>
          <LoadingButton
            disabled={!isDirty()}
            pending={loading}
            onClick={async () => {}}
          >
            Save Changes
          </LoadingButton>
        </div>
      </div>
    );
  };

  const preview = () => {
    return (
      selectedSlide && (
        <>
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
              <SlidePreviewEditor
                key={`editor-${selectedSlide.localId}`}
                value={() => selectedSlide}
                onChange={(value) => {
                  updateSlide(value);
                }}
              />
            </TabsContent>
            <TabsContent value="quiz" className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center space-x-4 mt-3">
                <QuizToggle
                  key={`quiz-toggle-${selectedSlide.localId}`}
                  slide={selectedSlide}
                  onEnabled={(e) => updateSlide(e)}
                  onDisabled={(e) => updateSlide(e)}
                />

                <Label htmlFor="airplane-mode">Enable Quiz</Label>
              </div>
              {(selectedSlide.enableQuiz || selectedSlide.quiz) && (
                <QuizForm
                  key={`quiz-editor-${selectedSlide.localId}`}
                  value={selectedSlide}
                  onChange={(value) => {
                    updateSlide(value);
                  }}
                />
              )}
            </TabsContent>
          </Tabs>
        </>
      )
    );
  };

  return (
    <>
      <ExitDialog isDirty={isDirty()} />

      <div className="flex flex-col border-1 h-auto min-h-[600] ">
        <div className="flex flex-1">
          <div className="w-[25%] border-r-1 ">
            <div className="p-3 border-b-1">
              <Button onClick={() => addSlide()} className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Slide
              </Button>
            </div>
            <SlideScrollableList>{slideItems()}</SlideScrollableList>
          </div>
          <div className="w-[75%] flex flex-col ">
            {topActionBar()}

            {selectedSlide ? (
              <div className="p-4">{preview()}</div>
            ) : (
              <div className="flex-1 m-4 p-4 flex items-center justify-center border-2 border-dashed rounded-xl text-gray-500 ">
                <p className="text-lg font-medium">
                  Select a slide to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
