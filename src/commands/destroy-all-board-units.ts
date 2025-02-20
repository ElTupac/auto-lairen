import { Board } from "../entities/board";
import { UnitPermanent } from "../entities/board/permanents";
import { Command } from "../entities/extensions/command";

export class DestroyAllBoardUnits extends Command {
  private _board: Board;
  private _permanents_to_blow_up: UnitPermanent[];

  constructor(board: Board) {
    super();
    this._board = board;
  }

  execute() {}
}
