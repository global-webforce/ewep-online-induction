"use client";

import { Button } from "@/components/ui/button";
import { Plus, Redo, Undo } from "lucide-react";
import { useState } from "react";

import LoadingButton from "@/components/react-hook-form-reusable/form-submit";
import { Slide } from "../types";
import { useSlideController } from "./slide-controller";
import SlidePreviewEditor from "./slide-preview-editor";
import { SlideScrollableList } from "./slide-scrollable-list";

export function SlideMaker({ value = [] }: { value?: Slide[] }) {
  const {
    slides,
    isEditMode,
    currentSlide,
    undoStack,
    redoStack,
    setCurrentSlide,
    updateSlide,
    addSlide,
    copySlide,
    deleteSlide,
    isDirty,
    setIsEditMode,
    onMoveSlide,
    undoChanges,
    redoChanges,
    currentIndex,
  } = useSlideController(value);

  const [loading, setLoading] = useState<boolean>(false);
  return (
    <>
      <div className="flex flex-col h-auto">
        <div className="flex flex-1">
          <div className="w-[25%] border-r ">
            <div className=" p-3 border-b">
              <Button onClick={addSlide} className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Slide
              </Button>
            </div>
            <div className="max-h-128 overflow-auto border-b">
              <SlideScrollableList
                slides={slides}
                currentSlide={currentSlide}
                onSelectSlide={(slide) => setCurrentSlide(slide)}
                onDeleteSlide={(id) => deleteSlide(id)}
                onCopySlide={(id) => copySlide(id)}
                onMoveSlide={(id, direction) => onMoveSlide(id, direction)}
              />
            </div>
          </div>
          <div className="w-[75%] flex flex-col">
            <div className="p-3 border-b flex justify-between">
              <div className="flex gap-2">
                <Button
                  onClick={() => setIsEditMode(true)}
                  variant={isEditMode ? "default" : "outline"}
                >
                  Edit Mode
                </Button>

                {/*   <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Presentation Mode</Button>
                  </DialogTrigger>

                  <DialogContent className="min-w-full h-screen p-0 m-0">
                    <DialogTitle className="sr-only" />

                    {slides && (
                      <Presentation
                        title={title}
                        readonly={true}
                        current={currentIndex()}
                        values={slides}
                      />
                    )}
                  </DialogContent>
                </Dialog> */}
              </div>

              <div className="flex space-x-2 items-center">
                <Button
                  size={"icon"}
                  disabled={undoStack.length === 0}
                  onClick={() => undoChanges()}
                >
                  <Undo />
                </Button>
                <Button
                  size={"icon"}
                  disabled={redoStack.length === 0}
                  onClick={() => redoChanges()}
                >
                  <Redo />
                </Button>
                <LoadingButton
                  pending={loading}
                  disabled={isDirty()}
                  onClick={async () => {
                    /*   if (save) {
                      setLoading(true);
                      try {
                        await save(
                          slides.map((e) => ({
                            ...e,
                            id: undefined,
                            answer: undefined,
                          }))
                        );
                      } catch (error) {
                        console.error("Error saving slides:", error);
                      } finally {
                        setLoading(false);
                      }
                    } */
                  }}
                >
                  Save Changes
                </LoadingButton>
              </div>
            </div>
            <div className="flex-1 ">
              <SlidePreviewEditor
                slide={currentSlide!}
                onChange={updateSlide}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
