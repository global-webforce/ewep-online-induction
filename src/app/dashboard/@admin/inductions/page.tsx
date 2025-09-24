"use client";
import { AlertPanelState } from "@/components/custom/alert-panel-state";
import { getAllInductions, InductionsTable } from "@/features/inductions";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["inductions"],
    queryFn: async () => await getAllInductions(),
  });

  return (
    <main className=" flex flex-col gap-4">
      {error && (
        <AlertPanelState onRetry={async () => await refetch()} variant="error">
          {error.message}
        </AlertPanelState>
      )}{" "}
      {isLoading && <AlertPanelState variant="loading" />}
      {<InductionsTable data={data || []} />}
    </main>
  );
}
