"use client";

import LoadingButton from "@/components/react-hook-form-reusable/form-submit";
import { useSlideControllerV2 } from "@/components/slide-maker/slides/slide-controller";
import { SlideScrollableList } from "@/components/slide-maker/slides/slide-list";
import SlidePreviewEditor from "@/components/slide-maker/slides/slide-preview-editor";
import ActionBar from "@/components/slide-maker/slides/slide/action-bar";
import CopyButton from "@/components/slide-maker/slides/slide/copy-button";
import DeleteButton from "@/components/slide-maker/slides/slide/delete-button";
import MoveButton from "@/components/slide-maker/slides/slide/move-button";
import QuizFlag from "@/components/slide-maker/slides/slide/quiz-flag";
import SlideItem from "@/components/slide-maker/slides/slide/slide";
import Thumbnail from "@/components/slide-maker/slides/slide/thumbnail";
import { Slide } from "@/components/slide-maker/types";
import { stripHtml } from "@/components/slide-maker/utils";
import { Button } from "@/components/ui/button";
import { Plus, Redo, Undo } from "lucide-react";
import { useState } from "react";

export default function SlideMaker({ value }: { value: Slide[] }) {
  const {
    slides,
    index: currentIndex,
    setIndex,
    addSlide,
    deleteSlide,
    copySlide,
    moveSlide,
    undo,
    redo,
    updateSlide,
  } = useSlideControllerV2(value);

  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className="flex flex-col h-auto">
      <div className="flex flex-1">
        <div className="w-[25%] border-r ">
          <div className=" p-3 border-b">
            <Button onClick={() => addSlide()} className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add Slide
            </Button>
          </div>
          <SlideScrollableList>
            {slides.map((slide: Slide, index: number) => (
              <SlideItem
                key={slide.localId}
                isActive={index === currentIndex}
                onClick={() => {
                  setIndex(index);
                }}
              >
                <Thumbnail>
                  <h1 className="font-semibold ">
                    {slide.title || "Enter Title"}
                  </h1>

                  <p className="text-sm text-muted-foreground truncate max-w-[250px]">
                    {stripHtml(slide.content || "New slide content")}
                  </p>
                </Thumbnail>
                <ActionBar isActive={true}>
                  <div className="flex items-center  m-2 text-white gap-2">
                    <span>{`${index + 1}`}</span>
                    <QuizFlag />
                  </div>

                  <div className="flex justify-end space-x-2">
                    {slides.length > 1 && (
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
                          moveSlide("up", index);
                        }}
                      />
                    )}

                    {index !== slides!.length - 1 && (
                      <MoveButton
                        direction="down"
                        onClick={(e) => {
                          e.stopPropagation();
                          moveSlide("down", index);
                        }}
                      />
                    )}
                  </div>
                </ActionBar>
              </SlideItem>
            ))}
          </SlideScrollableList>
        </div>
        <div className="w-[75%] flex flex-col min-h-11/12">
          <div className="p-3 border-b flex justify-between">
            <div className="flex space-x-2 items-center">
              <Button size={"icon"} onClick={() => undo()}>
                <Undo />
              </Button>
              <Button size={"icon"} onClick={() => redo()}>
                <Redo />
              </Button>
              <LoadingButton pending={loading} onClick={async () => {}}>
                Save Changes
              </LoadingButton>
            </div>
          </div>
          <div className="flex-1 ">
            <SlidePreviewEditor
              slide={slides[currentIndex]}
              onChange={(e) => {
                // updateSlide(e);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
