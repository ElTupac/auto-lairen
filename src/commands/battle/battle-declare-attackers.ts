import { UnitCard } from "../../entities/deck/kingdom/cards/unit-card";
import { Command } from "../../entities/extensions/command";
import { emitEvent } from "../../events/event-manager";
import { BoardMoveCardToArea } from "../board/board-move-card-to-area";

export class BattleDeclareAttackers extends Command {
  private _attackers: UnitCard[];
  private _on_declare: (attackersDeclared: UnitCard[]) => void;

  constructor(
    attackers: UnitCard[],
    on_declare: (attackersDeclared: UnitCard[]) => void
  ) {
    super();
    this._attackers = attackers;
    this._on_declare = on_declare;

    if (
      !!attackers.length &&
      !attackers.some(
        (card) =>
          !(
            card instanceof UnitCard &&
            card.permanent_linked &&
            card.permanent_linked.can_attack
          )
      )
    ) {
      throw new Error("Some attackers are not allowed to attack");
    }

    emitEvent("battle.declare-attackers", {
      origin_order: null,
      origin_permanent: null,
      origin_type: "interaction",
      data: this,
    });
  }

  get attackers() {
    return this._attackers;
  }
  set attackers(attackers: UnitCard[]) {
    if (
      !!attackers.length &&
      !attackers.some(
        (card) =>
          !(
            card instanceof UnitCard &&
            card.permanent_linked &&
            card.permanent_linked.can_attack
          )
      )
    ) {
      throw new Error("Some attackers are not allowed to attack");
    }

    this._attackers = attackers;
  }

  execute() {
    const attackArea = this._attackers[0].controller.board.attack;
    for (let i = 0; i < this._attackers.length; i++) {
      new BoardMoveCardToArea(this._attackers[i], attackArea, {
        type: "interaction",
        order: null,
        permanent: null,
      });
    }
    this._on_declare(this.attackers);
  }
}
