import { KingdomCard } from ".";
import { WeaponCardSchema } from "../../../../schemas/cards/weapon-card.schema";
import { Area } from "../../../extensions/area";

export abstract class WeaponCard extends KingdomCard<WeaponCardSchema> {
  constructor(startingArea?: Area) {
    super(startingArea);
  }

  get cost(): number {
    return this.schema.cost;
  }
}
