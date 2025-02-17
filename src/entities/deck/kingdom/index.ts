import { Area } from "../../extensions/area";
import { KingdomCard } from "./cards";
import { ActionCard } from "./cards/action-card";
import { MonumentCard } from "./cards/monument-card";
import { UnitCard } from "./cards/unit-card";
import { WeaponCard } from "./cards/weapon-card";

export class Kingdom extends Area {
  name = "kingdom-area";

  constructor(kingdom: (ActionCard | MonumentCard | UnitCard | WeaponCard)[]) {
    super(kingdom);
  }

  drawCard() {
    return this.popCardByIndex(0) as KingdomCard[];
  }
}
