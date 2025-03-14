import { UUID } from "crypto";
import { Permanent } from "../../extensions/permanent";
import { UnitPermanentSchema } from "../../../schemas/cards/unit-card.schema";
import { PermanentDestroy } from "../../../commands/permanents/permanent-destroy";
import { PermanentDead } from "../../../commands/permanents/permanent-dead";
import { UnitCard } from "../../deck/kingdom/cards/unit-card";
import { UnitGhostCard } from "../../deck/kingdom/cards/ghost-cards/unit-ghost-card";
import { KingdomCard } from "../../deck/kingdom/cards";
import { FormationArea } from "../areas/formation-area";

type UnitPermanentType = {
  origin_id: UUID;
  origin_order: UnitCard;
  schema: UnitPermanentSchema;
  linked_card: KingdomCard<unknown> | UnitGhostCard;
};

export class UnitPermanent extends Permanent<UnitPermanentSchema> {
  private _damage_register: number;
  private _destroy_when_damage_overflows: boolean = true;
  private _naturalized: boolean = false;

  private _temp_strengh_buff: number = 0;
  private _temp_resistance_buff: number = 0;
  private _perm_strengh_buff: number = 0;
  private _perm_resistance_buff: number = 0;

  private _is_dizzy: boolean = true;
  private _units_to_block: number = 1;
  private _evasion: boolean = false;
  private _ghost: boolean = false;

  constructor(unitPermanent: UnitPermanentType) {
    const schema = { ...unitPermanent.schema };
    if (typeof schema.data.damage_register !== "number")
      schema.data.damage_register = 0;

    super({
      origin: "unit",
      origin_id: unitPermanent.origin_id,
      origin_order: unitPermanent.origin_order,
      schema,
      linked_card: unitPermanent.linked_card,
    });

    if (unitPermanent.origin_order) {
      unitPermanent.origin_order.linkPermanent(this);
    }

    this._damage_register = schema.data.damage_register as number;
    if (schema.data.state_change) {
      const {
        perm_resistance_buff = 0,
        perm_strengh_buff = 0,
        temp_resistance_buff = 0,
        temp_strengh_buff = 0,
      } = schema.data.state_change;

      this._temp_strengh_buff = temp_strengh_buff;
      this._temp_resistance_buff = temp_resistance_buff;
      this._perm_strengh_buff = perm_strengh_buff;
      this._perm_resistance_buff = perm_resistance_buff;
    }
  }

  get damage_register() {
    return this._damage_register;
  }

  get is_destroyable() {
    return this._destroy_when_damage_overflows || this._naturalized;
  }

  get actual_strength() {
    const { strengh } = this.schema.data;

    return strengh + this._temp_strengh_buff + this._perm_strengh_buff;
  }
  get actual_resistance() {
    const { resistance } = this.schema.data;

    return resistance + this._temp_resistance_buff + this._perm_resistance_buff;
  }
  get damage_registered() {
    return this._damage_register;
  }
  get is_dizzy() {
    return this._is_dizzy;
  }
  get evasion() {
    return this._evasion;
  }
  get ghost() {
    return this._ghost;
  }

  get can_attack() {
    if (!(this.linked_card.area instanceof FormationArea)) return false;
    if (this.is_dizzy) return false;

    return true;
  }
  can_block(units: UnitCard[]): boolean {
    if (units.length > this._units_to_block) return false;
    if (
      units.some(
        ({ permanent_linked }) => permanent_linked && permanent_linked.evasion
      ) &&
      !this.evasion
    )
      return false;
    if (
      units.some(
        ({ permanent_linked }) => permanent_linked && permanent_linked.ghost
      ) &&
      !this.ghost
    )
      return false;
    return true;
  }

  registerDamage(quantity: number) {
    this._damage_register += quantity;
    if (this._damage_register >= this.actual_resistance)
      new PermanentDestroy(this);
  }
  addTemporalBuff(buff: { strengh?: number; resistance?: number }) {
    const { resistance = 0, strengh = 0 } = buff;

    this._temp_resistance_buff = resistance;
    this._temp_strengh_buff = strengh;

    if (this.actual_resistance <= 0) new PermanentDead(this);
  }
  addPermanentBuff(buff: { strengh?: number; resistance?: number }) {
    const { resistance = 0, strengh = 0 } = buff;

    this._perm_resistance_buff = resistance;
    this._perm_strengh_buff = strengh;

    if (this.actual_resistance <= 0) new PermanentDead(this);
  }
}
