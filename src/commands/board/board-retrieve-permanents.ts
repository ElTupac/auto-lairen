import { PlayerOwnBoard } from "../../entities/board";
import { Command } from "../../entities/extensions/command";
import { emitEvent } from "../../events/event-manager";

export class BoardRetrievePermanents extends Command {
  private _board: PlayerOwnBoard;

  constructor(board: PlayerOwnBoard) {
    super();

    this._board = board;

    emitEvent("board.retrieve-permanents", {
      origin_order: null,
      origin_permanent: null,
      origin_type: "interaction",
      data: this,
    });
  }

  execute() {
    const permanentsToRetrieve = this._board.attack.retrievePermanents();
    for (let i = 0; i < permanentsToRetrieve.length; i++) {
      this._board.formation.moveCardToThisArea(permanentsToRetrieve[i]);
    }
  }
}
