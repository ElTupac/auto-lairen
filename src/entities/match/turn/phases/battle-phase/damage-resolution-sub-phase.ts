import { BattleResolve } from "../../../../../commands/battle/battle-resolve";
import { prompt } from "../../../../../prompt";
import { BattleAttackBlockStrategy } from "../../../../battle-attack-block-strategy";
import { AttackArea } from "../../../../board/areas/attack-area";
import { FormationArea } from "../../../../board/areas/formation-area";
import { UnitCard } from "../../../../deck/kingdom/cards/unit-card";
import { SubPhase } from "../../../../extensions/sub-phase";

export class DamageResolutionSubPhase extends SubPhase {
  private _blocking_strategy: BattleAttackBlockStrategy;
  private _blockers_damage_assignment: {
    attacker: UnitCard;
    blockers: {
      unit: UnitCard;
      damage: number;
    }[];
  }[] = [];
  private _attackers_damage_assignment: {
    blocker: UnitCard;
    attackers: {
      unit: UnitCard;
      damage: number;
    }[];
  }[] = [];

  constructor(payload: {
    on_finish: () => void;
    priority_player: "player_1" | "player_2";
    blocking_strategy: BattleAttackBlockStrategy;
  }) {
    super(payload.priority_player, payload.on_finish);

    this._blocking_strategy = payload.blocking_strategy;
  }

  get blockers_damage_assignment() {
    return this._blockers_damage_assignment;
  }

  get attackers_damage_assignment() {
    return this._attackers_damage_assignment;
  }

  // TODO: re-think(re-do) this as a damage source to many targets, in a single method
  private async chooseBlockerDamageDistribution(_: {
    blocker: UnitCard;
    attackers: {
      unit: UnitCard;
      damage: number;
    }[];
  }): Promise<{
    blocker: UnitCard;
    attackers: {
      unit: UnitCard;
      damage: number;
    }[];
  }> {
    const { attackers, blocker } = _;
    const missingDamageToAssign =
      blocker.permanent_linked.actual_strength -
      attackers.reduce<number>((accum, { damage }) => accum + damage, 0);
    if (missingDamageToAssign < 0)
      throw new Error("Damage assigned is more than provided from blocker");
    if (!missingDamageToAssign) return _;

    const answer = await prompt(
      blocker.controller,
      attackers
        .filter(
          ({ unit }) => unit.permanent_linked && unit.area instanceof AttackArea
        )
        .map(({ unit }) => ({
          label: `Asignar damage a ${unit.schema.name} (${unit.permanent_linked.actual_strength} - ${unit.permanent_linked.actual_resistance})`,
          value: unit.id,
        })),
      "sub-phase.choose-target-for-damage-distribution"
    );
    const attackerToAssign = attackers.find(
      ({ unit }) => unit.id === answer.value
    );
    if (!attackerToAssign) return this.chooseBlockerDamageDistribution(_);

    const damageOptions: {
      label: string;
      value: string;
    }[] = [];
    for (let i = 1; i <= missingDamageToAssign; i++) {
      damageOptions.push({
        label: `Asignar ${i} dmg`,
        value: `${i}`,
      });
    }
    const damageAnswer = await prompt(
      blocker.controller,
      damageOptions,
      "sub-phase.choose-damage-distribution",
      {
        value: "assign-all-damage",
        label: `Asignar todo el ataque (${blocker.permanent_linked.actual_strength} dmg)`,
      }
    );

    if (damageAnswer.value === "assign-all-damage") {
      return {
        blocker,
        attackers: attackers.map(({ unit }) => ({
          unit,
          damage:
            unit.id === attackerToAssign.unit.id
              ? blocker.permanent_linked.actual_strength
              : 0,
        })),
      };
    } else if (missingDamageToAssign - +damageAnswer.value < 0)
      return this.chooseBlockerDamageDistribution(_);
    else {
      return this.chooseBlockerDamageDistribution({
        blocker,
        attackers: attackers.map(({ unit, damage }) => ({
          unit,
          damage:
            unit.id === attackerToAssign.unit.id
              ? damage + +damageAnswer.value
              : damage,
        })),
      });
    }
  }

  private async chooseAttackerDamageDistribution(_: {
    attacker: UnitCard;
    blockers: {
      unit: UnitCard;
      damage: number;
    }[];
  }): Promise<{
    attacker: UnitCard;
    blockers: {
      unit: UnitCard;
      damage: number;
    }[];
  }> {
    const { attacker, blockers } = _;
    const missingDamageToAssign =
      attacker.permanent_linked.actual_strength -
      blockers.reduce<number>((accum, { damage }) => accum + damage, 0);
    if (missingDamageToAssign < 0)
      throw new Error(
        "Damage assigned is more than the provided from attacker"
      );
    if (!missingDamageToAssign) return _;

    const answer = await prompt(
      attacker.controller,
      blockers
        .filter(
          ({ unit }) =>
            unit.permanent_linked && unit.area instanceof FormationArea
        )
        .map(({ unit }) => ({
          label: `Asignar damage a ${unit.schema.name} (${unit.permanent_linked.actual_strength} - ${unit.permanent_linked.actual_resistance})`,
          value: unit.id,
        })),
      "sub-phase.choose-target-for-damage-distribution"
    );
    const blockerToAssign = blockers.find(
      ({ unit }) => unit.id === answer.value
    );
    if (!blockerToAssign) return this.chooseAttackerDamageDistribution(_);

    const damageOptions: {
      label: string;
      value: string;
    }[] = [];
    for (let i = 1; i <= missingDamageToAssign; i++) {
      damageOptions.push({
        label: `Asignar ${i} dmg`,
        value: `${i}`,
      });
    }
    const damageAnswer = await prompt(
      attacker.controller,
      damageOptions,
      "sub-phase.choose-damage-distribution",
      {
        value: "assign-all-damage",
        label: `Asignar todo el ataque (${attacker.permanent_linked.actual_strength} dmg)`,
      }
    );
    if (damageAnswer.value === "assign-all-damage") {
      return {
        attacker,
        blockers: blockers.map(({ unit }) => ({
          unit,
          damage:
            unit.id === blockerToAssign.unit.id
              ? attacker.permanent_linked.actual_strength
              : 0,
        })),
      };
    } else if (missingDamageToAssign - +damageAnswer.value < 0)
      return this.chooseAttackerDamageDistribution(_);
    else {
      return this.chooseAttackerDamageDistribution({
        attacker,
        blockers: blockers.map(({ unit, damage }) => ({
          unit,
          damage:
            unit.id === blockerToAssign.unit.id
              ? damage + +damageAnswer.value
              : damage,
        })),
      });
    }
  }

  private startBlockersDamageAssignment() {
    return new Promise<void>(async (resolve) => {
      const blockers_damage_assignment: {
        attacker: UnitCard;
        blockers: {
          unit: UnitCard;
          damage: number;
        }[];
      }[] = this._blocking_strategy.strategy.map(({ attacker, blockers }) => ({
        attacker,
        blockers: blockers.map((card) => ({
          unit: card,
          damage: 0,
        })),
      }));

      for (let i = 0; i < blockers_damage_assignment.length; i++) {
        const current_damage_assignment = blockers_damage_assignment[i];
        if (
          !current_damage_assignment.attacker.permanent_linked ||
          !(current_damage_assignment.attacker.area instanceof AttackArea) ||
          current_damage_assignment.attacker.permanent_linked.actual_strength <=
            0
        )
          continue;

        blockers_damage_assignment[i] =
          await this.chooseAttackerDamageDistribution(
            current_damage_assignment
          );
      }

      resolve();
    });
  }

  private startAttackersDamageAssignment() {
    return new Promise<void>(async (resolve) => {
      const attackers_damage_assignment: {
        blocker: UnitCard;
        attackers: {
          unit: UnitCard;
          damage: number;
        }[];
      }[] = [];
      for (let i = 0; i < this._blocking_strategy.strategy.length; i++) {
        const { attacker, blockers } = this._blocking_strategy.strategy[i];

        for (let j = 0; j < blockers.length; j++) {
          const currentBlocker = blockers[j];
          const indexOfBlocker = attackers_damage_assignment.findIndex(
            ({ blocker }) => blocker.id === currentBlocker.id
          );
          if (indexOfBlocker < 0) {
            attackers_damage_assignment.push({
              blocker: currentBlocker,
              attackers: [
                {
                  damage: 0,
                  unit: attacker,
                },
              ],
            });
          } else {
            attackers_damage_assignment[indexOfBlocker] = {
              ...attackers_damage_assignment[indexOfBlocker],
              attackers: [
                ...attackers_damage_assignment[indexOfBlocker].attackers,
                {
                  damage: 0,
                  unit: attacker,
                },
              ],
            };
          }
        }
      }

      for (let i = 0; i < attackers_damage_assignment.length; i++) {
        const current_damage_assignment = attackers_damage_assignment[i];
        if (
          !current_damage_assignment.blocker.permanent_linked ||
          !(current_damage_assignment.blocker.area instanceof FormationArea) ||
          current_damage_assignment.blocker.permanent_linked.actual_strength <=
            0
        )
          continue;

        attackers_damage_assignment[i] =
          await this.chooseBlockerDamageDistribution(current_damage_assignment);
      }

      resolve();
    });
  }

  async startTurn() {
    await this.startBlockersDamageAssignment();
    await this.startAttackersDamageAssignment();
    new BattleResolve(
      this._attackers_damage_assignment,
      this._blockers_damage_assignment
    );

    this._on_finish();
  }
}
