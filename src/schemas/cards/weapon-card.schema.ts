import { CardSchema, PermanentSchema } from ".";
import { Match } from "../../entities/match";

export type WeaponCardSchema = CardSchema<{
  endurance: number;
  // Could be anything different than just paying gold
  equip_cost: string;
  can_equip: (match: Match) => Promise<boolean>;

  strengh_buff: number;
  resistance_buff: number;
}>;

export type WeaponPermanentSchema = PermanentSchema<{
  endurance: number;
  // Could be anything different than just paying gold
  equip: (match: Match) => Promise<void>;
  can_equip: (match: Match) => boolean;

  strengh_buff: number;
  resistance_buff: number;
}>;
