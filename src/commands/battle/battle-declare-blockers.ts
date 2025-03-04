import { Command } from "../../entities/extensions/command";
import { emitEvent } from "../../events/event-manager";
import { BattleAttackBlockStrategy } from "../../entities/battle-attack-block-strategy";

export class BattleDeclareBlockers extends Command {
  private _blocking_strategy: BattleAttackBlockStrategy;
  private _end_declaring_blockers: () => void;

  constructor(
    blocking_strategy: BattleAttackBlockStrategy,
    end_declaring_blockers: () => void
  ) {
    super();
    this._blocking_strategy = blocking_strategy;
    this._end_declaring_blockers = end_declaring_blockers;

    emitEvent("battle.declare-blockers", {
      origin_order: null,
      origin_permanent: null,
      origin_type: "interaction",
      data: this,
    });
  }

  get blocking_strategy() {
    return this._blocking_strategy;
  }

  execute() {
    this._end_declaring_blockers();
  }
}
