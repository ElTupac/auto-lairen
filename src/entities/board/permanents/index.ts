import { MonumentPermanent } from "./monument-permanent";
import { UnitPermanent } from "./unit-permanent";
import { WeaponPermanent } from "./weapon-permanent";

export { MonumentPermanent } from "./monument-permanent";
export { UnitPermanent } from "./unit-permanent";
export { WeaponPermanent } from "./weapon-permanent";

export type GeneralPermanent =
  | MonumentPermanent
  | UnitPermanent
  | WeaponPermanent;
