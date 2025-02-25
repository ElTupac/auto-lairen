import { KingdomCard } from ".";
import { WeaponCardSchema } from "../../../../schemas/cards/weapon-card.schema";
import { WeaponPermanent } from "../../../board/permanents";
import { Area } from "../../../extensions/area";

export abstract class WeaponCard extends KingdomCard<WeaponCardSchema> {
  private _permanent_linked?: WeaponPermanent;

  constructor(startingArea?: Area) {
    super(startingArea);
  }

  get cost(): number {
    return this.schema.cost;
  }

  linkPermanent(monument: WeaponPermanent) {
    this._permanent_linked = monument;
  }
  get permanent_linked(): WeaponPermanent | undefined {
    if (!this._permanent_linked) {
      this.owner.board.discard.moveCardToThisArea(this);
    }
    return this._permanent_linked;
  }
}
