import { KingdomCard } from "../../deck/kingdom/cards";
import { Area } from "../../extensions/area";

export class HandArea extends Area {
  name = "hand-area";

  addCards(cards: KingdomCard[]) {
    for (let i = 0; i < cards.length; i++) this.addCardToTop(cards[i]);
  }
}
