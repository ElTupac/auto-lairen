import { UnitCard } from "../../entities/deck/kingdom/cards/unit-card";
import { Command } from "../../entities/extensions/command";
import { emitEvent } from "../../events/event-manager";
import { BattleDealtDamage } from "./battle-dealt-damage";

export class BattleResolve extends Command {
  private _blockers_damage_assignment: {
    attacker: UnitCard;
    blockers: {
      unit: UnitCard;
      damage: number;
    }[];
  }[];
  private _attackers_damage_assignment: {
    blocker: UnitCard;
    attackers: {
      unit: UnitCard;
      damage: number;
    }[];
  }[];

  constructor(
    attackersDamageAssignment: {
      blocker: UnitCard;
      attackers: {
        unit: UnitCard;
        damage: number;
      }[];
    }[],
    blockersDamageAssignment: {
      attacker: UnitCard;
      blockers: {
        unit: UnitCard;
        damage: number;
      }[];
    }[]
  ) {
    super();

    this._attackers_damage_assignment = attackersDamageAssignment;
    this._blockers_damage_assignment = blockersDamageAssignment;

    emitEvent("battle.resolve", {
      origin_order: null,
      origin_permanent: null,
      origin_type: "interaction",
      data: this,
    });
  }

  execute() {
    for (let i = 0; i < this._blockers_damage_assignment.length; i++) {
      const currentDamageAssignment = this._blockers_damage_assignment[i];

      for (let j = 0; j < currentDamageAssignment.blockers.length; j++) {
        if (currentDamageAssignment.blockers[j].damage > 0) {
          new BattleDealtDamage(
            currentDamageAssignment.blockers[j].damage,
            currentDamageAssignment.attacker.permanent_linked,
            currentDamageAssignment.blockers[j].unit.permanent_linked
          );
        }
      }
    }

    for (let i = 0; i < this._attackers_damage_assignment.length; i++) {
      const currentDamageAssignment = this._attackers_damage_assignment[i];

      for (let j = 0; j < currentDamageAssignment.attackers.length; j++) {
        if (currentDamageAssignment.attackers[j].damage > 0) {
          new BattleDealtDamage(
            currentDamageAssignment.attackers[j].damage,
            currentDamageAssignment.blocker.permanent_linked,
            currentDamageAssignment.attackers[j].unit.permanent_linked
          );
        }
      }
    }
  }
}
