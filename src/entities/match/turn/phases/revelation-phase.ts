import { RevealTreasure } from "../../../../commands/reveal-treasure";
import { Phase } from "../../../extensions/phase";

export class RevelationPhase extends Phase {
  name = "revelation-phase";

  startPhase() {
    console.log(
      `turn ${this.turn_id} starts ${this.name}, ${
        this.match.getPlayerById(this.turn_player_owner_id).name
      }: ${this.turn_player_owner_id}`
    );

    const currentPlayer = this.match.getPlayerById(this.turn_player_owner_id);
    new RevealTreasure(currentPlayer.player, {
      type: "interaction",
    });

    this.next_phase();

    return;
  }
}
