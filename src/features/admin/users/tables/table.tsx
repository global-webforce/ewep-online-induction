"use client";

import React from "react";

import { useQuery } from "@tanstack/react-query";
import { AlertPanelState } from "@/components/custom/alert-panel-state";
import { DataTable } from "@/components/tanstack-table/datatable";
import { useColumns } from "./columns";
import { DataTableToolbar } from "./toolbar";
import { fetchAll } from "../actions/fetch-all";
import { TableSchema } from "../types/table";

export function Table() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["users"],
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
