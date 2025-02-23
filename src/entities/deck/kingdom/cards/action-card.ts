import { KingdomCard } from ".";
import { ActionCardSchema } from "../../../../schemas/cards/action-card.schema";
import { Area } from "../../../extensions/area";

export abstract class ActionCard extends KingdomCard<ActionCardSchema> {
  constructor(startingArea?: Area) {
    super(startingArea);
  }

  get cost(): number {
    return this.schema.cost;
  }
}
