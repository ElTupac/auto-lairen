import { KingdomCard } from ".";
import { UnitCardSchema } from "../../../../schemas/cards/unit-card.schema";
import { Area } from "../../../extensions/area";

export abstract class UnitCard extends KingdomCard<UnitCardSchema> {
  constructor(startingArea?: Area) {
    super(startingArea);
  }

  get cost(): number {
    return this.schema.cost;
  }
}
