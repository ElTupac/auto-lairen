import { Phase } from "../../../extensions/phase";

export class EndPhase extends Phase {
  name = "end-phase";

  startPhase() {
    console.log(
      `turn ${this.turn_id} starts ${this.name}, ${
        this.match.getPlayerById(this.turn_player_owner_id).name
      }: ${this.turn_player_owner_id}`
    );

    this.next_phase();

    return;
  }
}
