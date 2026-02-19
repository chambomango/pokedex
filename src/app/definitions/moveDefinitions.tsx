"use client";
import { Move, PokemonMoveVersion } from "pokenode-ts";
import { ColumnDef } from "@tanstack/react-table";
import PokeTypeBox from "@/components/pokeTypeBox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export type MoveWithVersions = Move & {
  version_group_details: PokemonMoveVersion[];
};

export type MoveColumn = {
  level: number;
  name: string;
  type: string;
  pp: number | null;
  accuracy: number | null;
  methodLearned: string;
};

export const MOVE_COLUMNS: ColumnDef<MoveColumn>[] = [
  {
    id: "level",
    accessorKey: "level",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Level
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (cell) => {
      return (
        <div className="pl-3 tabular-nums">
          {cell.row.getValue("level") || "-"}
        </div>
      );
    },
    sortingFn: (rowA, rowB, columnId) => {
      const a = rowA.getValue<number>(columnId) || Number.POSITIVE_INFINITY;
      const b = rowB.getValue<number>(columnId) || Number.POSITIVE_INFINITY;
      return a - b;
    },
  },
  {
    accessorKey: "name",
    header: "Move",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: (cell) => {
      return <PokeTypeBox type={cell.row.getValue("type")} />;
    },
  },
  {
    accessorKey: "pp",
    header: "PP",
  },
  {
    accessorKey: "accuracy",
    header: "Accuracy",
    cell: (cell) => {
      const accuracy = cell.row.getValue<number | null>("accuracy");
      return accuracy ? <div>{accuracy}%</div> : <div>-</div>;
    },
  },
  {
    accessorKey: "methodLearned",
    header: "Learned Via",
  },
];
