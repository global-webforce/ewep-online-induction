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

import ColumnBadge from "@/components/tanstack-table/column-badge";
import ColumnDateTime from "@/components/tanstack-table/column-datetime";
import { User__RowSchema } from "@/features/auth-types";

type T = User__RowSchema;

const columnHelper = createColumnHelper<T>();

export function useColumns(): ColumnDef<T>[] {
  const router = useRouter();

  const proxyColumns = [
    // ✅ Select column (non-data)
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

    // ✅ Email
    columnHelper.accessor("email", {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ cell }) => <div>{cell.getValue()}</div>,
    }),

    // ✅ App Role with filter function
    columnHelper.accessor("app_role", {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ cell }) => <ColumnBadge value={cell.getValue()} />,
      filterFn: (row, columnId, filterValue: string[]) => {
        if (!filterValue?.length) return true;
        const value = row.getValue(columnId) as string;
        return filterValue.includes(value);
      },
    }),

    // ✅ First Name
    columnHelper.accessor("first_name", {
      header: "First Name",
      cell: ({ cell }) => <div>{cell.getValue() ?? "-"}</div>,
    }),

    // ✅ Last Name
    columnHelper.accessor("last_name", {
      header: "Last Name",
      cell: ({ cell }) => <div>{cell.getValue() ?? "-"}</div>,
    }),

    // ✅ Confirmed At
    columnHelper.accessor("confirmed_at", {
      header: "Confirmed At",
      cell: ({ cell }) =>
        cell.getValue() ? (
          <ColumnDateTime value={cell.getValue()} />
        ) : (
          "Not confirmed"
        ),
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
      cell: ({ cell }) => <ColumnDateTime value={cell.getValue()} />,
    }),

    // ✅ Actions column (non-data)
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
                onClick={() => router.push(`/dashboard/users/${rowData.id}`)}
              >
                Manage
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(rowData.id)}
              >
                Copy User ID
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }),
  ];

  return proxyColumns as ColumnDef<T>[];
}
