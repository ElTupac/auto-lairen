import { Area } from "../../extensions/area";
import { Player } from "../../player";
import { KingdomCard } from "./cards";
import { ActionCard } from "./cards/action-card";
import { MonumentCard } from "./cards/monument-card";
import { UnitCard } from "./cards/unit-card";
import { WeaponCard } from "./cards/weapon-card";

export class Kingdom extends Area {
  name = "kingdom-area";

  constructor(
    player: Player,
    kingdom: (ActionCard | MonumentCard | UnitCard | WeaponCard)[]
  ) {
    super(player, kingdom);
  }

  drawCard() {
    return this.popCardByIndex(0) as KingdomCard[];
  }
}
