"use client";

import { AlertPanelState } from "@/components/custom/alert-panel-state";
import { DataTable } from "@/components/tanstack-table/datatable";
import { useQuery } from "@tanstack/react-query";
import { fetchAll } from "../actions/fetch-all";
import { TableSchema } from "../types/table";
import { useColumns } from "./columns";
import { DataTableToolbar } from "./toolbar";

export function Table() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["induction_sessions_admin_view"],
    queryFn: fetchAll,
  });

  return (
    <div className="space-y-4">
      {error && (
        <AlertPanelState onRetry={async () => await refetch()} variant="error">
          {error.message}
        </AlertPanelState>
      )}

      <DataTable columns={useColumns()} data={data || []} loading={isLoading}>
        {(table) => <DataTableToolbar<TableSchema> table={table} />}
      </DataTable>
    </div>
  );
}
