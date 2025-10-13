"use client";

import { AlertPanelState } from "@/components/custom/alert-panel-state";
import { DataTable } from "@/components/tanstack-table/datatable";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchAll } from "../actions/fetch-all";
import { RowSchema } from "../types/row";
import { useColumns } from "./columns";
import { DataTableToolbar } from "./toolbar";

export function Table() {
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["induction-quizzes"],
    queryFn: async () => await fetchAll(id),
  });

  return (
    <div className="space-y-4">
      {error && (
        <AlertPanelState onRetry={async () => await refetch()} variant="error">
          {error.message}
        </AlertPanelState>
      )}

      <DataTable columns={useColumns()} data={data || []} loading={isLoading}>
        {(table) => <DataTableToolbar<RowSchema> table={table} />}
      </DataTable>
    </div>
  );
}
