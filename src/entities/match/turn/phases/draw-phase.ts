import { DrawCard } from "../../../../commands/draw-card";
import { Phase } from "../../../extensions/phase";

export class DrawPhase extends Phase {
  name = "draw-phase";

  startPhase() {
    console.log(
      `turn ${this.turn_id} starts ${this.name}, ${
        this.match.getPlayerById(this.turn_player_owner_id).name
      }: ${this.turn_player_owner_id}`
    );

    const currentPlayer = this.match.getPlayerById(this.turn_player_owner_id);
    new DrawCard(this.match[currentPlayer.name]);

    this.next_phase();

    return;
  }
}
