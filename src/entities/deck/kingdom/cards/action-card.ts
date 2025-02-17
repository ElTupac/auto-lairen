import { ActionCardSchema } from "../../../../schemas/cards/action-card.schema";
import { Area } from "../../../extensions/area";
import { Card } from "../../../extensions/card";

export class ActionCard extends Card<ActionCardSchema> {
  constructor(startingArea?: Area) {
    super(startingArea);
  }
}
