import { UnitCard } from "../../../../deck/kingdom/cards/unit-card";
import { SubPhase } from "../../../../extensions/sub-phase";

export class BlockersSubPhase extends SubPhase {
  constructor(payload: {
    on_finish: () => void;
    priority_player: "player_1" | "player_2";
    declared_attackers: UnitCard[];
  }) {
    super(payload.priority_player, payload.on_finish);
  }

  startTurn() {}
}
