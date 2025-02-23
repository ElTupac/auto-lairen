import { Area } from "../../extensions/area";
import { Player } from "../../player";
import { ActionCard } from "./cards/action-card";
import { MonumentCard } from "./cards/monument-card";
import { UnitCard } from "./cards/unit-card";
import { WeaponCard } from "./cards/weapon-card";

export type KingdomCardsType =
  | ActionCard
  | MonumentCard
  | UnitCard
  | WeaponCard;

export class Kingdom extends Area {
  name = "kingdom-area";

  constructor(player: Player, kingdom: KingdomCardsType[]) {
    super(player, kingdom);
  }

  drawCard() {
    return this.popCardByIndex(0) as KingdomCardsType[];
  }
}
