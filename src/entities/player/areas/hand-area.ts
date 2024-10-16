import { Area } from "../../extensions/area";
import { Card } from "../../extensions/card";

export class HandArea extends Area<Card> {
  name = "hand-area";

  addCards(cards: Card[]) {
    for (let i = 0; i < cards.length; i++) this.addCardToTop(cards[i]);
  }
}
