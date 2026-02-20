"use client";
import {
  MoveColumn,
  MOVE_COLUMNS,
  MoveWithVersions,
} from "@/app/definitions/moveDefinitions";
import { prettyPrintMove, prettyMoveMethod } from "@/helpers/gridHelpers";
import { DataTable } from "./dataTable";
import { PokemonMove } from "pokenode-ts";
import React from "react";
import { moveClient } from "@/singletons/pokenodeTsClients";

export default function MovesTable(props: {
  initialMoves: PokemonMove[];
  fullMoves?: PokemonMove[];
}) {
  const [initialLoaded, setInitialLoaded] = React.useState<boolean>();
  const [pokemonMoves, setPokemonMoves] = React.useState<MoveColumn[]>([]);

  React.useEffect(() => {
    const data: MoveColumn[] = props.initialMoves.map((move) => {
      const levelLearned = move.version_group_details[0].level_learned_at;
      const mc: MoveColumn = {
        level: levelLearned,
        name: prettyPrintMove(move.move.name),
        methodLearned: prettyMoveMethod(
          move.version_group_details[0].move_learn_method.name,
        ),
      };
      return mc;
    });
    setPokemonMoves(data);
    setInitialLoaded(true);
  }, [props.initialMoves]);

  React.useEffect(() => {
    if (!initialLoaded) return;
    const moveTasks: Promise<MoveWithVersions>[] = props.initialMoves.map(
      async (move) => {
        const moveData = await moveClient.getMoveByName(move.move.name);
        return {
          ...moveData,
          version_group_details: move.version_group_details,
        };
      },
    );
    Promise.all(moveTasks).then((moves) => {
      const data: MoveColumn[] = moves.map((move) => {
        const levelLearned = move.version_group_details[0].level_learned_at;
        const mc: MoveColumn = {
          level: levelLearned,
          name: prettyPrintMove(move.name),
          type: move.type.name,
          pp: move.pp,
          accuracy: move.accuracy,
          methodLearned: prettyMoveMethod(
            move.version_group_details[0].move_learn_method.name,
          ),
        };
        return mc;
      });
      setPokemonMoves(data);
    });
  }, [initialLoaded]);

  return (
    <DataTable
      columns={MOVE_COLUMNS}
      data={pokemonMoves}
      defaultSorting={[{ id: "level", desc: false }]}
    ></DataTable>
  );
}
