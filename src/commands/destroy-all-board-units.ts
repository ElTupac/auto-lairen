import { Board } from "../entities/board";
import { GeneralPermanent } from "../entities/board/permanents";
import { KingdomCard } from "../entities/deck/kingdom/cards";
import { UnitCard } from "../entities/deck/kingdom/cards/unit-card";
import { Command } from "../entities/extensions/command";
import { emitEvent } from "../events/event-manager";
import { PermanentDestroy } from "./permanents/permanent-destroy";

export class DestroyAllBoardUnits extends Command {
  private _board: Board;

  constructor(
    board: Board,
    origin: {
      order?: KingdomCard<unknown>;
      permanent?: GeneralPermanent;
      type: "effect" | "order" | "permanent" | "interaction";
    }
  ) {
    super();
    this._board = board;

    emitEvent("board.destroy-all-board-units", {
      origin_order: origin.order || null,
      origin_permanent: origin.permanent || null,
      origin_type: origin.type,
      data: this,
    });
  }

  execute() {
    const p1_attack_permanents =
      this._board.areas.player_1.attack.content.filter(
        (card) => card instanceof UnitCard
      );
    const p1_formation_permanents =
      this._board.areas.player_1.formation.content.filter(
        (card) => card instanceof UnitCard
      );
    const p2_attack_permanents =
      this._board.areas.player_2.attack.content.filter(
        (card) => card instanceof UnitCard
      );
    const p2_formation_permanents =
      this._board.areas.player_2.formation.content.filter(
        (card) => card instanceof UnitCard
      );
    const allUnitsInBoard = [
      ...p1_attack_permanents,
      ...p1_formation_permanents,
      ...p2_attack_permanents,
      ...p2_formation_permanents,
    ];
    for (let i = 0; i < allUnitsInBoard.length; i++) {
      const permanentToDestroy = allUnitsInBoard[i].permanent_linked;
      if (permanentToDestroy) {
        new PermanentDestroy(permanentToDestroy);
      }
    }
  }
}
