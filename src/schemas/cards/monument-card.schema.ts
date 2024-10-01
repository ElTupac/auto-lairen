import { CardSchema } from ".";

export type MonumentCardSchema = CardSchema<{
  // Don't go to stack
  static_skills: unknown[];
  // Activated by player
  activated_skills: unknown[];
  // Activated when occurs event in game
  triggered_skills: unknown[];
}>;
