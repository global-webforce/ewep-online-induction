"use client";

import { AlertPanelState } from "@/components/custom/alert-panel-state";
import { DataTable } from "@/components/tanstack-table/datatable";

import { User__RowSchema } from "@/features/auth-types";
import { useFetchAll } from "../hooks/crud";
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
        {(table) => <DataTableToolbar<User__RowSchema> table={table} />}
      </DataTable>
    </div>
  );
}
