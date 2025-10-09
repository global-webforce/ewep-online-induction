"use client";

import { AlertPanelState } from "@/components/custom/alert-panel-state";
import {
  upsertAction,
  UpsertSchema,
} from "@/features/super-admin/induction-resources";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSlideController } from "./use-slide-controller";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchInductionResourcesById } from "@/features/super-admin/inductions/";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import HtmlPreview from "../../../components/html-viewer/html-preview";
import SlideFooter from "./design/footer";
import SlideHeader from "./design/header";
import FormComponent from "./form/form";

export default function SlidePresenter() {
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["inductions-with-resources"],
    queryFn: async () => await fetchInductionResourcesById(id),
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

  const { selectedSlide, slides, selectedIndex, setSelectedIndex } =
    useSlideController(data || undefined);

  return (
    <>
      {error && (
        <AlertPanelState onRetry={async () => await refetch()} variant="error">
          {error.message}
        </AlertPanelState>
      )}

      {isLoading && (
        <AlertPanelState variant="loading">
          Loading Induction and Resources
        </AlertPanelState>
      )}

      {selectedSlide && (
        <div className="flex flex-col flex-1  bg-white text-black ">
          <SlideHeader />

          <div className="flex flex-col flex-1  relative">
            <div className="absolute top-0 bottom-0 overflow-y-scroll w-full">
              <div className="p-4 flex flex-col gap-4 ">
                {selectedSlide?.title?.trim() !== "" && (
                  <h1 className="text-3xl font-bold">{selectedSlide?.title}</h1>
                )}

                {selectedSlide?.content &&
                  selectedSlide?.content.trim() !== "" && (
                    <HtmlPreview htmlContent={selectedSlide.content} />
                  )}

                {selectedSlide?.quiz && (
                  <>
                    <FormComponent
                      value={selectedSlide?.quiz}
                      onChange={(value) => {
                        const currentSlide = slides[selectedIndex];
                        slides[selectedIndex] = {
                          ...currentSlide,
                          quiz: currentSlide.quiz
                            ? {
                                ...currentSlide.quiz,
                                answer: value.answer,
                              }
                            : null,
                        };
                      }}
                    />
                  </>
                )}
              </div>

              <SlideFooter />
            </div>
          </div>

          {selectedSlide && (
            <div className="bg-background border-1 text-white ">
              <Separator />
              <div className=" flex items-center justify-center gap-4 p-3">
                <Button
                  variant="outline"
                  onClick={() =>
                    setSelectedIndex((prev) => Math.max(prev - 1, 0))
                  }
                  //disabled={selectedIndex === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                Page {selectedIndex! + 1} of {slides.length}
                <Button
                  variant="outline"
                  onClick={() =>
                    setSelectedIndex((prev) =>
                      Math.min(prev + 1, slides.length - 1)
                    )
                  }
                >
                  {selectedIndex === slides.length - 1 ? "Finish" : "Next"}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
