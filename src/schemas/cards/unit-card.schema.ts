import { CardSchema } from ".";
import { UnitCardAttributeType } from "../../types/unit-card-attribute.type";

export type UnitCardSchema = CardSchema<{
  attributes: UnitCardAttributeType[];
  strengh: number;
  resistance: number;
  // Don't go to stack
  static_skills: unknown[];
  // Activated by player
  activated_skills: unknown[];
  // Activated when occurs event in game
  triggered_skills: unknown[];
}>;
