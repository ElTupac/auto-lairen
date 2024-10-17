import { CardSchema, PermanentSchema } from ".";
import { StaticEffect } from "../../entities/extensions/static-effect";
import { UnitCardAttributeType } from "../../types/unit-card-attribute.type";

export type UnitCardSchema = CardSchema<{
  attributes: UnitCardAttributeType[];
  strengh: number;
  resistance: number;
  // Don't go to stack
  static_skills: StaticEffect[];
  // Activated by player
  activated_skills: unknown[];
  // Activated when occurs event in game
  triggered_skills: unknown[];
}>;

export type UnitPermanentSchema = PermanentSchema<{
  attributes: UnitCardAttributeType[];
  strengh: number;
  resistance: number;
  // Don't go to stack
  static_skills: StaticEffect[];
  // Activated by player
  activated_skills: unknown[];
  // Activated when occurs event in game
  triggered_skills: unknown[];
}>;
