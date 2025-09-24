"use client";

import LoadingButton from "@/components/react-hook-form-reusable/form-submit";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Redo, Undo } from "lucide-react";
import { useNavigationGuard } from "next-navigation-guard";
import { useState } from "react";

import { SlideSchema } from "../types";
import { SlideScrollableList } from "./layout/slide-list";
import SlidePreviewEditor from "./layout/slide-preview-editor";
import ActionBar from "./slide/action-bar";
import CopyButton from "./slide/copy-button";
import DeleteButton from "./slide/delete-button";
import MoveButton from "./slide/move-button";
import QuizFlag from "./slide/quiz-flag";
import SlideItem from "./slide/slide";
import Thumbnail from "./slide/thumbnail";
import { useSlideController } from "./use-slide-controller";
import { stripHtml } from "./utils";

export default function SlideMaker({
  value,
}: {
  value: SlideSchema[] | undefined;
}) {
  const {
    slides,
    index: currentIndex,
    pristineValue,
    setSlides,
    updateSlide,
    isDirty,
    setIndex,
    addSlide,
    deleteSlide,
    copySlide,
    moveSlide,
    undo,
    redo,
  } = useSlideController(value);

  const confirmExit = useNavigationGuard({
    enabled: isDirty(),
    confirm: undefined,
  });

  const [loading] = useState<boolean>(false);
  return (
    <>
      {/*     <div>
        <div className=" border-amber-400 border-2">
          <p>Slides Value</p>
          <pre>{JSON.stringify(slides, null, 2)}</pre>
        </div>
        <div className=" border-amber-400 border-2">
          {" "}
          <p>Pristine Value</p>
          <pre>{JSON.stringify(pristineValue, null, 2)}</pre>
        </div>
        <div className=" border-amber-400 border-2">
          {" "}
          <p>Is Dirty</p>
          <pre>{JSON.stringify(isDirty(), null, 2)}</pre>
        </div>
      </div> */}
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
          <div className="w-[25%]">
            <div className=" p-3 border-1 border-b-0">
              <Button onClick={() => addSlide()} className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Slide
              </Button>
            </div>
            <SlideScrollableList>
              {slides &&
                slides!.map((slide: SlideSchema, index: number) => (
                  <SlideItem
                    key={slide.localId}
                    isActive={index === currentIndex}
                    onClick={() => {
                      setIndex(index);
                    }}
                  >
                    <Thumbnail>
                      <h1 className="font-semibold ">{slide.title || ""}</h1>

                      <p className="text-sm text-muted-foreground truncate max-w-[250px]">
                        {stripHtml(slide.content || "")}
                      </p>
                    </Thumbnail>
                    <ActionBar isActive={index === currentIndex}>
                      <div className="flex items-center  m-2 text-white gap-2">
                        <span>{`${index + 1}`}</span>
                        <QuizFlag />
                      </div>

                      <div className="flex justify-end space-x-2">
                        {slides!.length > 1 && (
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
          <div className="w-[75%] flex flex-col ">
            <div className="p-3 border-t-1 border-r-1 flex justify-between">
              <div className="flex space-x-2 items-center">
                <Button size={"icon"} onClick={() => undo()}>
                  <Undo />
                </Button>
                <Button size={"icon"} onClick={() => redo()}>
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
            <div className="flex-1 border-1 border-l-0">
              {slides && slides.length > 0 && (
                <SlidePreviewEditor
                  slide={slides[currentIndex]}
                  onChange={(e) => {
                    updateSlide(e);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
