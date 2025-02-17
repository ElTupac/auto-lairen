import { WeaponCardSchema } from "../../../../schemas/cards/weapon-card.schema";
import { Area } from "../../../extensions/area";
import { Card } from "../../../extensions/card";

export class WeaponCard extends Card<WeaponCardSchema> {
  constructor(startingArea?: Area) {
    super(startingArea);
  }
}
