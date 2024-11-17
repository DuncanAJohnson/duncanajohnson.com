"use client";

import { ColumnDef } from "@tanstack/react-table";
import { JournalEntry } from "@/.contentlayer/generated";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export const columns: ColumnDef<JournalEntry>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const journalEntry = row.original;

      return (
        <div className="flex flex-row items-center space-x-1">
          <div className="flex flex-col">
            <div className="text-sm font-medium leading-none">
              <Link href={`${journalEntry.slug}`}>
                {journalEntry.title}
              </Link>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const journalEntry = row.original;
      return new Date(journalEntry.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
];
