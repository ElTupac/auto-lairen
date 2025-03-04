import { randomUUID, UUID } from "crypto";
import { UnitCard } from "./deck/kingdom/cards/unit-card";

export class BattleAttackBlockStrategy {
  private _id: UUID;
  private _declared_attackers: UnitCard[];
  private _declared_blockers: Record<UUID, UnitCard[]>;

  constructor(
    blocking_strategy: Record<UUID, UnitCard[]>,
    attackers: UnitCard[]
  ) {
    this._id = randomUUID();
    this._declared_attackers = attackers;
    this._declared_blockers = blocking_strategy;
  }

  get id() {
    return this._id;
  }
  get strategy() {
    const strategy: {
      attacker: UnitCard;
      blockers: UnitCard[];
    }[] = [];

    for (let i = 0; i < this._declared_attackers.length; i++)
      strategy.push({
        attacker: this._declared_attackers[i],
        blockers: this._declared_blockers[this._declared_attackers[i].id] || [],
      });

    return strategy;
  }
  set strategy(
    strategy: {
      attacker: UnitCard;
      blockers: UnitCard[];
    }[]
  ) {
    this._declared_attackers = strategy.map(({ attacker }) => attacker);
    const declared_blockers: Record<UUID, UnitCard[]> = {};
    for (let i = 0; i < strategy.length; i++)
      declared_blockers[strategy[i].attacker.id] = strategy[i].blockers;
    this._declared_blockers = declared_blockers;
  }
}
