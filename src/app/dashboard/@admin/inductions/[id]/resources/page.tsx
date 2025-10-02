"use client";

import { AlertPanelState } from "@/components/custom/alert-panel-state";
import { BackButton } from "@/components/custom/back-button";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import SlideMaker from "@/features/induction-resources/induction-builder/slide-maker";
import { getInductionResourcesById } from "@/features/induction-resources/queries";
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
        queryKey: [`induction-resources`, id],
        queryFn: async () => await getInductionResourcesById(id),
      },
    ],
  });

  return (
    <div className="space-y-4 h-full">
      <header className="flex gap-4 align-middle items-center mb-4">
        <div className="space-x-2">
          <Button asChild variant="outline" size="icon">
            <SidebarTrigger />
          </Button>
          <BackButton />
        </div>
        <h1 className="text-xl font-semibold">Manage Induction Resources</h1>
      </header>

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

      {inductionQuery.data && inductionSlidesQuery.data && (
        <SlideMaker
          induction={inductionQuery.data}
          value={inductionSlidesQuery.data}
        />
      )}
    </div>
  );
}
