import { UUID } from "crypto";
import { Permanent } from "../../extensions/permanent";
import { UnitPermanentSchema } from "../../../schemas/cards/unit-card.schema";
import { PermanentDestroy } from "../../../commands/permanents/permanent-destroy";
import { PermanentDead } from "../../../commands/permanents/permanent-dead";
import { UnitCard } from "../../deck/kingdom/cards/unit-card";

type UnitPermanentType = {
  origin_id: UUID;
  origin_order: UnitCard;
  schema: UnitPermanentSchema;
};

export class UnitPermanent extends Permanent<UnitPermanentSchema> {
  private _damage_register: number;
  private _destroy_when_damage_overflows: boolean = true;
  private _naturalized: boolean = false;

  private _temp_strengh_buff: number = 0;
  private _temp_resistance_buff: number = 0;
  private _perm_strengh_buff: number = 0;
  private _perm_resistance_buff: number = 0;

  constructor(unitPermanent: UnitPermanentType) {
    const schema = { ...unitPermanent.schema };
    if (typeof schema.data.damage_register !== "number")
      schema.data.damage_register = 0;

    super({
      origin: "unit",
      origin_id: unitPermanent.origin_id,
      origin_order: unitPermanent.origin_order,
      schema,
    });

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
