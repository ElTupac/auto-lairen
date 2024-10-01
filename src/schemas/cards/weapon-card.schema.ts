import { CardSchema } from ".";

export type WeaponCardSchema = CardSchema<{
  endurance: number;
  // Could be anything different than just paying gold
  equip_cost: unknown;

  strengh_buff: number;
  resistance_buff: number;

  // Don't go to stack
  static_skills: unknown[];
  // Activated by player
  activated_skills: unknown[];
  // Activated when occurs event in game
  triggered_skills: unknown[];
}>;
