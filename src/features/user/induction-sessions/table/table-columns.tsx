"use client";

import ColumnBadge from "@/components/tanstack-table/column-badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

import { SessionsRowViewSchema } from "@/features/types";
import Link from "next/link";

type T = SessionsRowViewSchema;

const columnHelper = createColumnHelper<T>();

export function useColumns(): ColumnDef<T>[] {
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

    columnHelper.accessor("has_passed", {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <>
          {row.original.has_valid_induction && <ColumnBadge value={"Passed"} />}
          {row.original.has_passed === false && (
            <ColumnBadge value={"Failed"} />
          )}
          {row.original.is_expired && <ColumnBadge value={"Expired"} />}
        </>
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
      cell: ({ row }) => row.original.session_valid_until_formatted,
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
      cell: ({ row }) => row.original.session_created_at_formatted,
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
                onClick={() => {
                  router.push(`/dashboard/inductions/${rowData.induction_id}`);
                }}
              >
                {rowData.has_valid_induction === true
                  ? "Review Induction"
                  : "Take Induction"}
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() =>
                  router.push(`/dashboard/induction-sessions/${rowData.id}`)
                }
              >
                View
              </DropdownMenuItem>

              {rowData.has_valid_induction && (
                <DropdownMenuItem asChild>
                  <Link target="_blank" href={`/certificate/${rowData.id}`}>
                    Download Certificate
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }),
  ];

  return columns as ColumnDef<T>[];
}
