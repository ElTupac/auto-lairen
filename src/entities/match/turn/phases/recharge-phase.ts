import { Phase } from "../../../extensions/phase";

export class RechargePhase extends Phase {
  name = "recharge-phase";

  startPhase() {
    console.log(
      `turn ${this.turn_id} starts ${this.name}, ${
        this.match.getPlayerById(this.turn_player_owner_id).name
      }: ${this.turn_player_owner_id}`
    );

    const currentPlayer = this.match.getPlayerById(this.turn_player_owner_id);
    const board = this.match.board.areas[currentPlayer.name];
    const permanentsToRetrieve = board.attack.retrievePermanents();
    board.formation.addCards(permanentsToRetrieve);

    const treasuresToRetrieve = board.out_of_use_reserve.retrieveTreasures();
    board.reserve.addCards(treasuresToRetrieve);

    if (board.reserve.content.length < 7) this.next_phase();
    if (this.turn_number !== 0) this.go_to_phase(2);
    else this.go_to_phase(3);
    return;
  }
}
