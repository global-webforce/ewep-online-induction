"use client";

import ColumnBadge from "@/components/tanstack-table/column-badge";
import ColumnDate from "@/components/tanstack-table/column-date";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { RowSchema } from "../types/row";

const columnHelper = createColumnHelper<RowSchema>();

export function useColumns(): ColumnDef<RowSchema>[] {
  const router = useRouter();

  const columns = [
    // ✅ Selection checkbox column
    columnHelper.display({
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    }),

    // ✅ Induction title
    columnHelper.accessor("induction_title", {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Induction ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ cell }) => (
        <div className="truncate max-w-[200px]">{cell.getValue()}</div>
      ),
    }),

    // ✅ Valid Until
    columnHelper.accessor("valid_until", {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Valid Until
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ cell }) => <ColumnDate value={cell.getValue()} />,
    }),

    columnHelper.accessor("status", {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ cell }) => <ColumnBadge value={cell.getValue()} />,
    }),

    // ✅ Created At
    columnHelper.accessor("created_at", {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ cell }) => <ColumnDate value={cell.getValue()} />,
    }),

    // ✅ Actions column
    columnHelper.display({
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const rowData = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuItem
                onClick={() =>
                  router.push(`/dashboard/induction-sessions/${rowData.id}`)
                }
              >
                Manage
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(rowData.id)}
              >
                Copy ID
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(rowData.user_id)}
              >
                Copy User ID
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(rowData.induction_id)
                }
              >
                Copy Induction ID
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>View History</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }),
  ];

  return columns as ColumnDef<RowSchema>[];
}
