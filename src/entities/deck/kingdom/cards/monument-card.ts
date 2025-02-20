import { MonumentCardSchema } from "../../../../schemas/cards/monument-card.schema";
import { Area } from "../../../extensions/area";
import { Card } from "../../../extensions/card";

export abstract class MonumentCard extends Card<MonumentCardSchema> {
  constructor(startingArea?: Area) {
    super(startingArea);
  }
}
