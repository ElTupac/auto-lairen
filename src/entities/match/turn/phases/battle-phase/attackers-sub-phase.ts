import { Match } from "../../..";
import { BattleDeclareAttackers } from "../../../../../commands/battle/battle-declare-attackers";
import { GetMatch } from "../../../../../decorators/get-match";
import { prompt } from "../../../../../prompt";
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

  startTurn() {
    const turnPlayer = this.get_match()[this._priority_player];
    const availableAttackers = turnPlayer.board.formation.content.filter(
      (card) =>
        card instanceof UnitCard &&
        card.permanent_linked &&
        card.permanent_linked.can_attack
    ) as UnitCard[];

    prompt(
      turnPlayer,
      [
        {
          label: "Terminar fase",
          value: "end-phase",
        },
        ...(availableAttackers.length > 0
          ? [
              {
                label: "Elegir atacantes",
                value: availableAttackers.map(({ id }) => id).join("||"),
              },
            ]
          : []),
      ],
      "sub-phase.declare-attacker"
    ).then((answer) => {
      if (answer.value === "end-phase") return this._on_cancel();
      else {
        const attackers = availableAttackers.filter(({ id }) =>
          answer.value.split("||").includes(id)
        );
        new BattleDeclareAttackers(attackers, this._on_finish);
      }
    });
  }
}
