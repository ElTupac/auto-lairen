import { KingdomCard } from ".";
import { MonumentCardSchema } from "../../../../schemas/cards/monument-card.schema";
import { MonumentPermanent } from "../../../board/permanents";
import { Area } from "../../../extensions/area";

export abstract class MonumentCard extends KingdomCard<MonumentCardSchema> {
  private _permanent_linked?: MonumentPermanent;

  constructor(startingArea?: Area) {
    super(startingArea);
  }

  get cost(): number {
    return this.schema.cost;
  }

  linkPermanent(monument: MonumentPermanent) {
    this._permanent_linked = monument;
  }
  get permanent_linked(): MonumentPermanent | undefined {
    if (!this._permanent_linked) {
      this.owner.board.discard.moveCardToThisArea(this);
    }
    return this._permanent_linked;
  }
}
