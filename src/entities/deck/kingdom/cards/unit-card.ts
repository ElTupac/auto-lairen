import { KingdomCard } from ".";
import { UnitCardSchema } from "../../../../schemas/cards/unit-card.schema";
import { UnitPermanent } from "../../../board/permanents";
import { Area } from "../../../extensions/area";

export abstract class UnitCard extends KingdomCard<UnitCardSchema> {
  private _permanent_linked?: UnitPermanent;

  constructor(startingArea?: Area) {
    super(startingArea);
  }

  get cost(): number {
    return this.schema.cost;
  }

  linkPermanent(unit: UnitPermanent) {
    this._permanent_linked = unit;
  }
  get permanent_linked(): UnitPermanent | undefined {
    if (!this._permanent_linked) {
      this.owner.board.discard.moveCardToThisArea(this);
    }
    return this._permanent_linked;
  }
}
