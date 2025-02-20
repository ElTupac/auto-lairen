import { CardSchema, PermanentSchema } from ".";
import { UnitCardAttributeType } from "../../types/unit-card-attribute.type";

export type UnitCardSchema = CardSchema<{
  attributes: UnitCardAttributeType[];
  strengh: number;
  resistance: number;
}>;

export type UnitPermanentSchema = PermanentSchema<{
  attributes: UnitCardAttributeType[];
  strengh: number;
  resistance: number;

  damage_register?: number;
  state_change?: Partial<{
    temp_strengh_buff: number;
    temp_resistance_buff: number;
    perm_strengh_buff: number;
    perm_resistance_buff: number;
  }>;
}>;
