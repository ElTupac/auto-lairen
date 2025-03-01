import { SubPhase } from "../../../../extensions/sub-phase";

export class AttackersSubPhase extends SubPhase {
  private _on_cancel: () => void;

  constructor(payload: {
    on_finish: () => void;
    on_cancel: () => void;
    priority_player: "player_1" | "player_2";
  }) {
    super(payload.priority_player, payload.on_finish);
  }
}
