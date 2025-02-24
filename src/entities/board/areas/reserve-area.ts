import { UUID } from "crypto";
import { Area } from "../../extensions/area";
import { Treasure } from "../../extensions/treasure";

export class ReserveArea extends Area {
  name = "reserve-area";

  addCards(cards: Treasure[]) {
    for (let i = 0; i < cards.length; i++)
      this.addCardToTop(cards[i] as Treasure);
  }
  sendCardToBottom(card: Treasure) {
    this.addCardToBottom(card);
  }
  sendCartToTop(card: Treasure) {
    this.addCardToTop(card);
  }
  removeCards(cards_id: UUID[]) {
    const cards: Treasure[] = [];
    for (let i = 0; i < cards_id.length; i++) {
      const index = this.content.findIndex(({ id }) => id === cards_id[i]);
      if (index > -1) {
        const poppedCard = this.popCardByIndex(index);
        if (poppedCard.length) cards.push(poppedCard[0] as Treasure);
      }
    }

    return cards;
  }

  get availableTreasures(): number {
    return this.content.length;
  }
}
