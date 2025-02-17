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

  damage_register: number;
}>;
