import { KingdomCard } from "../../../deck/kingdom/cards";
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
    const board = this.match.board.areas[currentPlayer.name];
    const cardToDraw = board.kingdom.drawCard();
    if (!cardToDraw.length)
      throw new Error(`${currentPlayer.name} lose, couldn't draw cards`);
    currentPlayer.player.playerHand.moveCardToThisArea(cardToDraw[0]);

    this.next_phase();

    return;
  }
}
