"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSlideController } from "./use-slide-controller";
import { AlertPanelState } from "@/components/custom/alert-panel-state";
import {
  upsertAction,
  UpsertSchema,
} from "@/features/super-admin/induction-resources";

import { useParams } from "next/navigation";
import { fetchInductionResourcesById } from "@/features/super-admin/inductions/";
import FormComponent from "./form/form";
import IframeWithHtml from "@/components/custom/iframe";

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

  const { slides, selectedSlide, selectedId, setSelectedId } =
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
        <div className="flex flex-1    relative">
          <div className="absolute top-0 bottom-0 overflow-y-scroll w-full space-y-4">
            {selectedSlide?.content && (
              <IframeWithHtml
                htmlContent={selectedSlide.content || ""}
              ></IframeWithHtml>
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
        </div>
      }
    </>
  );
}
