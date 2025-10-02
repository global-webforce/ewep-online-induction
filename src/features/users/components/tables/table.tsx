"use client";

import React from "react";
import { DataTable } from "./datatable";
import { useQuery } from "@tanstack/react-query";
import { getAll } from "../../queries";
import { AlertPanelState } from "@/components/custom/alert-panel-state";

export function Table() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["inductions"],
    queryFn: async () => await getAll(),
  });

  return (
    <div className="space-y-4">
      {error && (
        <AlertPanelState onRetry={async () => await refetch()} variant="error">
          {error.message}
        </AlertPanelState>
      )}

      <DataTable data={data || []} loading={isLoading} />
    </div>
  );
}
