import { KingdomCard } from "../entities/deck/kingdom/cards";
import { Area } from "../entities/extensions/area";

export class MoveCardToArea {
  constructor(card: KingdomCard, areaToMove: Area<unknown>) {
    card.moveToArea(areaToMove);
  }
}
