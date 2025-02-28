import { PlayerOwnBoard } from "../../entities/board";
import { Command } from "../../entities/extensions/command";
import { emitEvent } from "../../events/event-manager";
import { BoardMoveCardToArea } from "./board-move-card-to-area";

export class BoardRetrieveTreasures extends Command {
  private _board: PlayerOwnBoard;

  constructor(board: PlayerOwnBoard) {
    super();

    this._board = board;

    emitEvent("board.retrieve-treasures", {
      origin_order: null,
      origin_permanent: null,
      origin_type: "interaction",
      data: this,
    });
  }

  execute() {
    const treasuresToRetrieve =
      this._board.out_of_use_reserve.retrieveTreasures();
    for (let i = 0; i < treasuresToRetrieve.length; i++) {
      new BoardMoveCardToArea(treasuresToRetrieve[i], this._board.reserve, {
        type: "interaction",
        order: null,
        permanent: null,
      });
    }
  }
}
