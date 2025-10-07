"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { formatLabel } from "@/components/tanstack-table/column-badge";
import { TableSchema } from "../types/table";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  function getColumn<T extends keyof TableSchema>(key: T) {
    return table.getColumn(key as string);
  }

  const roleColumn = getColumn("app_role");

  return (
    <div className="flex items-center gap-2 mb-3 justify-between">
      <div className="flex items-center gap-2 ">
        {/* Global Search */}
        <Input
          placeholder="Search all..."
          value={(table.getState().globalFilter as string) ?? ""}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          className="max-w-xs"
        />

        {/* Role filter dropdown */}
        {roleColumn && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Filter Role</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {["super_admin", "user"].map((role) => (
                <DropdownMenuCheckboxItem
                  key={role}
                  checked={
                    (roleColumn.getFilterValue() as string[])?.includes(role) ??
                    false
                  }
                  onCheckedChange={(checked) => {
                    const prev =
                      (roleColumn.getFilterValue() as string[]) ?? [];
                    if (checked) {
                      roleColumn.setFilterValue([...prev, role]);
                    } else {
                      roleColumn.setFilterValue(prev.filter((r) => r !== role));
                    }
                  }}
                >
                  {formatLabel(role)}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Reset Filters */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              table.setGlobalFilter("");
            }}
          >
            Reset <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {/*  <Button asChild>
        <Link href="/dashboard/users/create">Add New</Link>
      </Button> */}
    </div>
  );
}
