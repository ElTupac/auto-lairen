import { KingdomCard } from ".";
import { MonumentCardSchema } from "../../../../schemas/cards/monument-card.schema";
import { Area } from "../../../extensions/area";

export abstract class MonumentCard extends KingdomCard<MonumentCardSchema> {
  constructor(startingArea?: Area) {
    super(startingArea);
  }

  get cost(): number {
    return this.schema.cost;
  }
}
