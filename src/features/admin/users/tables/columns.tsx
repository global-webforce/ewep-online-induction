"use client";

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

import ColumnBadge from "@/components/custom/tanstack-table/column-badge";
import ColumnDate from "@/components/custom/tanstack-table/column-date";
import { TableSchema } from "../types/table";

export const columnHelper = createColumnHelper<TableSchema>();

export function useColumns(): ColumnDef<TableSchema, any>[] {
  return [
    // ✅ Select Checkbox
    {
      accessorKey: "select",
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
    },

    // ✅ Email
    columnHelper.accessor("email", {
      cell: ({ cell }) => <div>{cell.getValue()}</div>,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    }),

    // ✅ Role
    columnHelper.accessor("app_role", {
      cell: ({ cell }) => <ColumnBadge value={cell.getValue()} />,
      filterFn: (row, columnId, filterValue: string[]) => {
        if (!filterValue?.length) return true;
        const value = row.getValue(columnId) as string;
        return filterValue.includes(value);
      },
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    }),

    // ✅ First Name
    columnHelper.accessor("first_name", {
      cell: ({ cell }) => <div>{cell.getValue() ?? "-"}</div>,
      header: "First Name",
    }),

    // ✅ Last Name
    columnHelper.accessor("last_name", {
      cell: ({ cell }) => <div>{cell.getValue() ?? "-"}</div>,
      header: "Last Name",
    }),

    // ✅ Email Confirmed At
    columnHelper.accessor("email_confirmed_at", {
      cell: ({ cell }) => {
        return cell.getValue() ? (
          <ColumnDate value={cell.getValue()} />
        ) : (
          "Not confirmed"
        );
      },
      header: "Email Confirmed At",
    }),

    // ✅ Created At
    columnHelper.accessor("created_at", {
      cell: ({ cell }) => {
        return <ColumnDate value={cell.getValue()} />;
      },
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    }),

    // ✅ Actions Column
    {
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
                onClick={() => navigator.clipboard.writeText(rowData.id)}
              >
                Copy User ID
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
