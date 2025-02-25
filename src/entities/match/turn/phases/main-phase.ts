import { prompt } from "../../../../prompt";
import { Phase } from "../../../extensions/phase";

export class MainPhase extends Phase {
  name = "main-phase";

  startPhase() {
    console.log(
      `turn ${this.turn_id} starts ${this.name}, ${
        this.match.getPlayerById(this.turn_player_owner_id).name
      }: ${this.turn_player_owner_id}`
    );

    const turnPlayer = this.match.getPlayerById(this.turn_player_owner_id);

    if (this._current_phase_number() === 5) this.next_phase();
    else
      prompt(
        turnPlayer.player,
        turnPlayer.name === "player_1"
          ? [
              { label: "p1 no entra en battle", value: "p1_no-battle" },
              { label: "p1 entra en battle", value: "p1_to-battle" },
            ]
          : [
              { label: "p2 no entra en battle", value: "p2_no-battle" },
              { label: "p2 entra en battle", value: "p2_to-battle" },
            ]
      ).then((answer) => {
        if (answer.value.includes("to-battle")) this.next_phase();
        else this.go_to_phase(6);
      });

    return;
  }
}
