import { Board } from "../entities/board";
import { Command } from "../entities/extensions/command";

export class DestroyAllBoardUnits extends Command {
  private _board: Board;

  constructor(board: Board) {
    super();
    this._board = board;
  }

  execute() {}
}
