import { UnitCardSchema } from "../../../../schemas/cards/unit-card.schema";
import { Area } from "../../../extensions/area";
import { Card } from "../../../extensions/card";

export abstract class UnitCard extends Card<UnitCardSchema> {
  constructor(startingArea?: Area) {
    super(startingArea);
  }
}
