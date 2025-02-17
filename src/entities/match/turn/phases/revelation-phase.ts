import { Phase } from "../../../extensions/phase";
import { Treasure } from "../../../extensions/treasure";

export class RevelationPhase extends Phase {
  name = "revelation-phase";

  startPhase() {
    console.log(
      `turn ${this.turn_id} starts ${this.name}, ${
        this.match.getPlayerById(this.turn_player_owner_id).name
      }: ${this.turn_player_owner_id}`
    );

    const currentPlayer = this.match.getPlayerById(this.turn_player_owner_id);
    const board = this.match.board.areas[currentPlayer.name];
    const cardToReveal = board.vault.popTopCard() as Treasure[];
    board.reserve.addCards(cardToReveal);

    this.next_phase();

    return;
  }
}
