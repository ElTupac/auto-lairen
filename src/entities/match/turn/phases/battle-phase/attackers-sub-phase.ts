import { Match } from "../../..";
import { BattleDeclareAttackers } from "../../../../../commands/battle/battle-declare-attackers";
import { GetMatch } from "../../../../../decorators/get-match";
import { multipleOptionPrompt } from "../../../../../prompt";
import { UnitCard } from "../../../../deck/kingdom/cards/unit-card";
import { SubPhase } from "../../../../extensions/sub-phase";

export class AttackersSubPhase extends SubPhase {
  private _on_cancel: () => void;

  constructor(payload: {
    on_finish: (attackersDeclared: UnitCard[]) => void;
    on_cancel: () => void;
    priority_player: "player_1" | "player_2";
  }) {
    super(payload.priority_player, payload.on_finish);
  }

  @GetMatch()
  get_match: () => Match;

  startSubPhase() {
    const turnPlayer = this.get_match()[this._priority_player];
    const availableAttackers = turnPlayer.board.formation.content.filter(
      (card) =>
        card instanceof UnitCard &&
        card.permanent_linked &&
        card.permanent_linked.can_attack
    ) as UnitCard[];

    multipleOptionPrompt(
      turnPlayer,
      availableAttackers.map(({ id, schema, permanent_linked }) => ({
        value: id,
        label: `${schema.name} (${permanent_linked.actual_strength} - ${permanent_linked.actual_resistance})`,
      })),
      {
        label: "Terminar fase",
        value: "end-phase",
      },
      "sub-phase.declare-attacker"
    ).then((answer) => {
      if (answer.some(({ value }) => value === "end-phase"))
        return this._on_cancel();
      else {
        const attackers = availableAttackers.filter((unit) =>
          answer.some(({ value }) => unit.id === value)
        );
        new BattleDeclareAttackers(attackers, this._on_finish);
      }
    });
  }
}
