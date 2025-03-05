import { UnitPermanent } from "../../entities/board/permanents";
import { Command } from "../../entities/extensions/command";
import { emitEvent } from "../../events/event-manager";

export class BattleDealtDamage extends Command {
  private _source: UnitPermanent;
  private _target: UnitPermanent;
  private _damage_to_dealt: number;

  constructor(
    damage_to_dealt: number,
    source: UnitPermanent,
    target: UnitPermanent
  ) {
    super();

    this._damage_to_dealt = damage_to_dealt;
    this._source = source;
    this._target = target;

    emitEvent("battle.dealt-damage", {
      origin_order: null,
      origin_permanent: null,
      origin_type: "interaction",
      data: this,
    });
  }

  get source() {
    return this._source;
  }
  get target() {
    return this._target;
  }
  get damage_to_dealt() {
    return this._damage_to_dealt;
  }

  execute() {
    this.source.registerDamage(this.damage_to_dealt);
  }
}
