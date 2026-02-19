"use client";
import { Column } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ReactNode } from "react";

export function SortedHeader<TData, TValue>({
  column,
  children,
  allowUnsorted = true,
}: {
  column: Column<TData, TValue>; //TData and TValue inferred automatically
  children: ReactNode;
  allowUnsorted?: boolean;
}) {
  const sorted = column.getIsSorted();

  return (
    <Button
      variant="ghost"
      onClick={() =>
        allowUnsorted
          ? column.toggleSorting()
          : column.toggleSorting(sorted === "asc")
      }
    >
      {children}
      {sorted === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
      {sorted === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
      {!sorted && <ArrowUpDown className="ml-2 h-4 w-4 opacity-40" />}
    </Button>
  );
}
