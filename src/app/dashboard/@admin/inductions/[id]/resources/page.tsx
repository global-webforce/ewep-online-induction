"use client";

import { AlertPanelState } from "@/components/custom/alert-panel-state";
import { getInductionResourcesById } from "@/features/induction-resources/queries";
import SlideMaker from "@/features/induction-resources/induction-builder/slide-maker";

import { getInductionById } from "@/features/inductions";
import { useQueries } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function SingleInductionPage() {
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

  return (
    <>
      {inductionQuery.error && (
        <AlertPanelState
          onRetry={async () => await inductionQuery.refetch()}
          variant="error"
        >
          {inductionQuery.error.message}
        </AlertPanelState>
      )}
      {inductionSlidesQuery.error && (
        <AlertPanelState
          onRetry={async () => await inductionSlidesQuery.refetch()}
          variant="error"
        >
          {inductionSlidesQuery.error.message}
        </AlertPanelState>
      )}
      {(inductionQuery.isLoading || inductionSlidesQuery.isLoading) && (
        <AlertPanelState variant="loading">
          Loading Induction and Resources
        </AlertPanelState>
      )}

      <h1 className="text-xl font-bold">{inductionQuery.data?.title}</h1>

      <SlideMaker value={inductionSlidesQuery.data} />
    </>
  );
}
