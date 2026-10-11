"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Mdx } from "@/components/mdx-components";
import { Experience } from "@/.contentlayer/generated";
import { Input } from "@/components/ui/input";
import React from "react";
import { useMediaQuery } from "usehooks-ts";

interface DataTableProps<TValue> {
  columns: ColumnDef<Experience, TValue>[];
  data: Experience[];
}

export function DataTable<TValue>({
  columns,
  data,
}: DataTableProps<TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const isSmUp = useMediaQuery("(min-width: 640px)");
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  React.useEffect(() => {
    // On small screens, hide the date columns (we render a compact date range in the Role column).
    setColumnVisibility({
      startDate: isSmUp,
      endDate: isSmUp,
    });
  }, [isSmUp]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onExpandedChange: setExpanded,
    getRowCanExpand: () => true,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
      columnVisibility,
      expanded,
    },
  });

  return (
    <div>
      <div className="card">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="px-2 sm:px-4">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                    className={row.getIsExpanded() ? "border-b-0" : undefined}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="p-2 sm:p-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.getIsExpanded() && (
                    <TableRow className="hover:bg-transparent">
                      <TableCell
                        colSpan={row.getVisibleCells().length}
                        className="px-2 pb-6 pt-0 sm:px-4"
                      >
                        <div className="space-y-3 text-sm leading-relaxed [&_a]:underline [&_a]:underline-offset-2 [&_h2]:pt-2 [&_h2]:text-base [&_h2]:font-semibold [&_li]:mt-1 [&_ul]:list-disc [&_ul]:pl-6">
                          <Mdx code={row.original.body.code} />
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-2 py-4">
        <Button
          variant="outline"
          size="sm"
          className="w-full sm:w-auto"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-full sm:w-auto"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
