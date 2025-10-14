"use client";

import { AlertPanelState } from "@/components/custom/alert-panel-state";
import { DataTable } from "@/components/tanstack-table/datatable";
import { useFetchAll } from "../hooks/fetch-all";
import { RowSchema } from "../types/view";
import { useColumns } from "./table-columns";
import { DataTableToolbar } from "./table-toolbar";

export function TableView() {
  const { data, error, isLoading, refetch } = useFetchAll();

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
