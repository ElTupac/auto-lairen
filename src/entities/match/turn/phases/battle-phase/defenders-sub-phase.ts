import { UUID } from "node:crypto";
import { UnitCard } from "../../../../deck/kingdom/cards/unit-card";
import { SubPhase } from "../../../../extensions/sub-phase";
import { GetMatch } from "../../../../../decorators/get-match";
import { Match } from "../../..";
import { multipleOptionPrompt, prompt } from "../../../../../prompt";
import { BattleAttackBlockStrategy } from "../../../../battle-attack-block-strategy";
import { BattleDeclareBlockers } from "../../../../../commands/battle/battle-declare-blockers";
import { FormationArea } from "../../../../board/areas/formation-area";

export class BlockersSubPhase extends SubPhase {
  private _declared_attackers: UnitCard[];
  private _declared_blockers: Record<UUID, UnitCard[]>;

  private _started: boolean = false;

  constructor(payload: {
    on_finish: (blocking_strategy: BattleAttackBlockStrategy) => void;
    priority_player: "player_1" | "player_2";
    declared_attackers: UnitCard[];
  }) {
    super(payload.priority_player, payload.on_finish);
    this._declared_attackers = payload.declared_attackers;
    this._declared_blockers = {};
    for (let i = 0; i < payload.declared_attackers.length; i++)
      this._declared_blockers[payload.declared_attackers[i].id] = [];
  }

  @GetMatch()
  get_match: () => Match;

  private blockerOptions() {
    const player = this.get_match()[this._priority_player];
    prompt(
      player,
      this._declared_attackers.map(({ id, schema, permanent_linked }) => ({
        value: id,
        label: `${schema.name} (${permanent_linked.actual_strength} - ${permanent_linked.actual_resistance})`,
      })),
      "sub-phase.choose-attacker-to-block",
      {
        value: "go-back",
        label: "Volver",
      }
    ).then((answer) => {
      if (answer.value === "go-back") return this.initialQuestion();
      else {
        const attackerId = answer.value as UUID;
        if (!this._declared_blockers[attackerId]) return this.blockerOptions();
        else {
          const unitsInFormation = player.board.formation.content.filter(
            (card) =>
              card instanceof UnitCard &&
              card.permanent_linked &&
              card.area instanceof FormationArea
          ) as UnitCard[];
          const unitsThatCanBlock = unitsInFormation.filter((unit) => {
            const alreadyBlocking: UnitCard[] = [];
            Object.entries(this._declared_blockers).map(([key, blockers]) => {
              if (blockers.some(({ id }) => id === unit.id)) {
                const attacker = this._declared_attackers.find(
                  ({ id }) => id === key && id !== attackerId
                );
                if (attacker) alreadyBlocking.push(attacker);
              }
            });
            const attacker = this._declared_attackers.find(
              ({ id }) => id === attackerId
            );
            if (!attacker) return false;
            return (
              unit.permanent_linked &&
              unit.permanent_linked.can_block([...alreadyBlocking, attacker])
            );
          });
          multipleOptionPrompt(
            player,
            unitsThatCanBlock.map(({ id, schema, permanent_linked }) => ({
              value: id,
              label: `${schema.name} (${permanent_linked.actual_strength} - ${permanent_linked.actual_resistance})`,
            })),
            {
              label: "No declarar blockers en esta unidad",
              value: "no-blockers",
            },
            "sub-phase.choose-blockers-for-attacker"
          ).then((answers) => {
            if (answers.some(({ value }) => value === "no-blockers"))
              this._declared_blockers[attackerId] = [];
            else {
              const blockersDeclared = unitsThatCanBlock.filter(({ id }) =>
                answers.some(({ value }) => (value as UUID) === id)
              );
              this._declared_blockers[attackerId] = blockersDeclared;
            }

            return this.initialQuestion();
          });
        }
      }
    });
  }

  private initialQuestion() {
    const player = this.get_match()[this._priority_player];
    prompt(
      player,
      [
        {
          value: "declare-blockers",
          label: "Declarar bloqueador",
        },
      ],
      "sub-phase.declare-blockers",
      {
        value: "end-declaring-blockers",
        label: "Terminar de declarar defensores",
      }
    ).then((answer) => {
      if (answer.value === "end-declaring-blockers") {
        const strategy = new BattleAttackBlockStrategy(
          this._declared_blockers,
          this._declared_attackers
        );
        new BattleDeclareBlockers(strategy, this._on_finish);
      } else if (answer.value === "declare-blockers")
        return this.blockerOptions();
      else return this.initialQuestion();

      return;
    });
  }

  startTurn() {
    if (!this._started) {
      this._started = true;
      this.initialQuestion();
    }
  }
}
