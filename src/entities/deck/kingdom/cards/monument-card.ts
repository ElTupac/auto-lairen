import { MonumentCardSchema } from "../../../../schemas/cards/monument-card.schema";
import { Area } from "../../../extensions/area";
import { Card } from "../../../extensions/card";
import { Stackable } from "../../../extensions/stackable";

export abstract class MonumentCard extends Card<MonumentCardSchema> {
  constructor(startingArea?: Area) {
    super(startingArea);
  }

  get cost(): number {
    return this.schema.cost;
  }

  abstract play(...args: unknown[]): Promise<Stackable>;
  abstract additional_cost?(...args: unknown[]): Promise<boolean>;
}
