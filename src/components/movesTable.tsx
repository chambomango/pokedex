import {
  MoveColumn,
  MOVE_COLUMNS,
  MoveWithVersions,
} from "@/app/definitions/moveDefinitions";
import { prettyPrintMove, prettyMoveMethod } from "@/helpers/gridHelpers";
import { DataTable } from "./dataTable";

export default function MovesTable(props: { moves: MoveWithVersions[] }) {
  const data: MoveColumn[] = props.moves.map((move) => {
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

  return (
    <DataTable
      columns={MOVE_COLUMNS}
      data={data}
      defaultSorting={[{ id: "level", desc: false }]}
    ></DataTable>
  );
}
