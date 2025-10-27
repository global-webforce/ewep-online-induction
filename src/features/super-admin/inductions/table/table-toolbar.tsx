"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import Link from "next/link";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
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
      </div>
      <Button asChild>
        <Link href="/dashboard/inductions/create">Create New</Link>
      </Button>
    </div>
  );
}
