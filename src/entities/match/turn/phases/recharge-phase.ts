import { Phase } from "../../../extensions/phase";
import { Stack } from "../../../stack";

export class RechargePhase extends Phase {
  name = "recharge-phase";

  async startPhase() {
    const board =
      this.match.board.areas[
        this.match.getPlayerById(this._turn_player_owner_id).name
      ];
    const permanentsToRetrieve = board.attack.retrievePermanents();
    board.formation.addCards(permanentsToRetrieve);

    const treasuresToRetrieve = board.out_of_use_reserve.retrieveTreasures();
    board.reserve.addCards(treasuresToRetrieve);

    this.next_phase();
    return;
  }
  endPhase() {
    return new Promise<void>((resolve) => {
      new Stack({
        priority: this.match.getPlayerById(this._turn_player_owner_id).name,
        on_close_stack: resolve,
      });
    });
  }
}
