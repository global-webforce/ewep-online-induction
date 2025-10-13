"use client";

import { AlertPanelState } from "@/components/custom/alert-panel-state";

import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UpsertSchema } from "@/features/super-admin/induction-resources";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Redo, Undo } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { fetchById, upsertAction } from "./actions";
import {
  ActionBar,
  CopyButton,
  DeleteButton,
  MoveButton,
  SlideItem,
  Thumbnail,
} from "./components/slide";

import { FormSubmitButton } from "@/components/react-hook-form-reusable";
import FormComponent from "./form/form";
import { useSlideController } from "./hooks/use-slide-controller";
import { FormSchema } from "./types/form";

function stripHtml(input: string): string {
  return input
    .replace(/(<([^>]+)>)/gi, "") // remove tags
    .replace(/&[^;]+;/g, ""); // remove entities
}

export default function SlideBuilder() {
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["inductions-with-resources"],
    queryFn: async () => await fetchById(id),
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      slidesToUpsert,
      slidesToDelete,
    }: {
      slidesToUpsert: UpsertSchema[];
      slidesToDelete: number[];
    }) =>
      upsertAction({
        slidesToUpsert: slidesToUpsert,
        slidesToDelete: slidesToDelete,
      }),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["inductions-with-resources"],
      });
      toast.success("Record has been updated.");
    },
  });

  const {
    slides,
    undoStack,
    onSave,
    redoStack,
    selectedSlide,
    selectedId,
    slideRefs,
    setSelectedId,
    updateSlide,
    isDirty,
    addSlide,
    deleteSlide,
    copySlide,
    moveSlide,
    undo,
    redo,
  } = useSlideController(data);

  const slideItems = () => {
    return (
      slides &&
      slides.length > 0 &&
      slides.map((slide: FormSchema, index: number) => (
        <SlideItem
          key={`slide-item-${slide?.localId}`}
          ref={(el: HTMLDivElement | null) => {
            slideRefs.current[slide.localId] = el;
          }}
          isActive={slide.localId === selectedId}
          onClick={() => {
            setSelectedId(slide.localId);
          }}
        >
          <Thumbnail>
            <>
              <h1 className="font-semibold line-clamp-1">
                {slide.title || ""}
              </h1>

              <p className="text-sm text-muted-foreground line-clamp-2 ">
                {stripHtml(slide.content || "")}
              </p>
            </>
          </Thumbnail>
          <ActionBar isActive={slide.localId === selectedId}>
            <div className="flex items-center  m-2 text-white gap-2">
              <span>{`${index + 1}`}</span>
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
        <div className="flex gap-2">
          <Button
            disabled={undoStack.length === 0}
            size={"icon"}
            onClick={() => undo()}
          >
            <Undo />
          </Button>
          <Button
            disabled={redoStack.length === 0}
            size={"icon"}
            onClick={() => redo()}
          >
            <Redo />
          </Button>

          <FormSubmitButton
            isSubmitting={isPending}
            isFormLoading={isLoading}
            onClick={async () => {
              const { slidesToUpsert, slidesToDelete } = onSave();
              console.log("Slides to upsert:", slidesToUpsert);
              console.log("Slides to delete:", slidesToDelete);
              mutate({ slidesToUpsert, slidesToDelete });
            }}
            disabled={!isDirty() || isError}
          >
            Save Changes
          </FormSubmitButton>
        </div>
      </div>
    );
  };

  return (
    <>
      {error && (
        <AlertPanelState onRetry={async () => await refetch()} variant="error">
          {error.message}
        </AlertPanelState>
      )}

      {
        <div className="flex flex-1  border-1  relative">
          <div className="w-[25%] border-r-1 flex flex-col  flex-1 basis-auto absolute left-0 top-0 bottom-0">
            <div className="p-3 border-b-1">
              <Button
                disabled={isLoading}
                onClick={() => addSlide()}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Slide
              </Button>
            </div>

            <div className="h-full overflow-y-scroll basis-auto p-3 space-y-3 ">
              <TooltipProvider>{slideItems()}</TooltipProvider>
            </div>
          </div>
          <div className="w-[25%] "></div>
          <div className=" flex flex-col  flex-1 basis-auto ">
            {topActionBar()}

            {selectedSlide ? (
              <div className="p-4">
                <FormComponent
                  key={selectedId}
                  value={selectedSlide}
                  onChange={(value) => updateSlide(value)}
                />
              </div>
            ) : (
              <div className="flex-1 m-4 p-4 flex items-center justify-center border-2 border-dashed rounded-xl text-gray-500 ">
                <p className="text-lg font-medium">
                  Select a slide to get started
                </p>
              </div>
            )}
          </div>
        </div>
      }
    </>
  );
}
