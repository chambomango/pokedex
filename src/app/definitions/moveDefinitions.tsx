"use client";
import { Move, PokemonMoveVersion } from "pokenode-ts";
import { ColumnDef } from "@tanstack/react-table";
import PokeTypeBox from "@/components/pokeTypeBox";
import { SortedHeader } from "@/components/dataTableHeaders";

export type MoveWithVersions = Move & {
  version_group_details: PokemonMoveVersion[];
};

export type MoveColumn = {
  level: number;
  name: string;
  type?: string;
  pp?: number | null;
  accuracy?: number | null;
  methodLearned: string;
};

export const MOVE_COLUMNS: ColumnDef<MoveColumn>[] = [
  {
    id: "level",
    accessorKey: "level",
    header: ({ column }) => {
      return (
        <SortedHeader
          key={`${column.id}-${String(column.getIsSorted() ?? "none")}`}
          column={column}
          allowUnsorted={false}
        >
          Level
        </SortedHeader>
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
    header: ({ column }) => {
      return (
        <SortedHeader
          key={`${column.id}-${String(column.getIsSorted() ?? "none")}`}
          column={column}
        >
          Move
        </SortedHeader>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <SortedHeader
          key={`${column.id}-${String(column.getIsSorted() ?? "none")}`}
          column={column}
        >
          Type
        </SortedHeader>
      );
    },
    cell: (cell) => {
      return <PokeTypeBox type={cell.row.getValue("type")} />;
    },
  },
  {
    accessorKey: "pp",
    header: ({ column }) => {
      return (
        <SortedHeader
          key={`${column.id}-${String(column.getIsSorted() ?? "none")}`}
          column={column}
        >
          PP
        </SortedHeader>
      );
    },
  },
  {
    accessorKey: "accuracy",
    header: ({ column }) => {
      return (
        <SortedHeader
          key={`${column.id}-${String(column.getIsSorted() ?? "none")}`}
          column={column}
        >
          Accuracy
        </SortedHeader>
      );
    },
    cell: (cell) => {
      const accuracy = cell.row.getValue<number | null>("accuracy");
      return accuracy ? <div>{accuracy}%</div> : <div>-</div>;
    },
  },
  {
    accessorKey: "methodLearned",
    header: ({ column }) => {
      return (
        <SortedHeader
          key={`${column.id}-${String(column.getIsSorted() ?? "none")}`}
          column={column}
        >
          Learned Via
        </SortedHeader>
      );
    },
  },
];
