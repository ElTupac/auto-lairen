import { PermanentSchema } from ".";

export type WeaponCardSchema = {
  endurance: number;
  strengh_buff: number;
  resistance_buff: number;
};

export type WeaponPermanentSchema = PermanentSchema<{
  endurance: number;
  strengh_buff: number;
  resistance_buff: number;
}>;
