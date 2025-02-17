import { ActionCard } from "./action-card";
import { MonumentCard } from "./monument-card";
import { UnitCard } from "./unit-card";
import { WeaponCard } from "./weapon-card";

export { ActionCard } from "./action-card";
export { MonumentCard } from "./monument-card";
export { UnitCard } from "./unit-card";
export { WeaponCard } from "./weapon-card";

export type KingdomCard = ActionCard | MonumentCard | UnitCard | WeaponCard;
