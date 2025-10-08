"use client";

import { AlertPanelState } from "@/components/custom/alert-panel-state";
import {
  upsertAction,
  UpsertSchema,
} from "@/features/super-admin/induction-resources";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSlideController } from "./use-slide-controller";

import { fetchInductionResourcesById } from "@/features/super-admin/inductions/";
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

  const { selectedSlide, slides, selectedIndex, setSelectedId } =
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

      {
        <div className="flex flex-col flex-1">
          <SlideHeader />

          <div className="flex flex-col flex-1  relative">
            <div className="absolute top-0 bottom-0 overflow-y-scroll border-1 w-full space-y-4">
              <div className="p-4 space-y-4">
                {selectedSlide?.title?.trim() !== "" && (
                  <h1 className="text-2xl font-bold">{selectedSlide?.title}</h1>
                )}

                {selectedSlide?.content &&
                  selectedSlide?.content.trim() !== "" && (
                    <HtmlPreview htmlContent={selectedSlide.content} />
                  )}

                {selectedSlide?.quiz && (
                  <>
                    <FormComponent
                      value={selectedSlide?.quiz!}
                      onChange={() => {}}
                    />
                  </>
                )}
              </div>

              <SlideFooter />
            </div>
            {/*   <footer className="fixed bottom-0 left-0 right-0 bg-background ">
              <Separator />

              <div className=" flex items-center justify-center gap-4 h-16 px-4 ">
                <Button
                  variant="outline"
                  onClick={goToPreviousSlide}
                  disabled={currentIndex() === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                Page {currentIndex() + 1} of {slides.length}
                <Button variant="outline" onClick={set}>
                  {currentIndex() === slides.length - 1 ? "Finish" : "Next"}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </footer> */}
          </div>
        </div>
      }
    </>
  );
}
