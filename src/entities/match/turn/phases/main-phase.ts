import { prompt } from "../../../../prompt";
import { UnitCard } from "../../../deck/kingdom/cards/unit-card";
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
    else if (
      turnPlayer.player.board.formation.content.some(
        (card) =>
          card instanceof UnitCard &&
          card.permanent_linked &&
          card.permanent_linked.can_attack
      )
    ) {
      prompt(
        turnPlayer.player,
        [
          { label: "No entra en battle", value: "no-battle" },
          { label: "Entrar en battle", value: "to-battle" },
        ],
        "phase.end-main-phase-1"
      ).then((answer) => {
        if (answer.value === "to-battle") this.next_phase();
        else this.go_to_phase(6);
      });
    } else {
      this.go_to_phase(6);
    }

    return;
  }
}
