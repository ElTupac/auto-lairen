import { UUID } from "crypto";
import { Area } from "../../extensions/area";
import { Treasure } from "../../extensions/treasure";

export class OutOfUseReserveArea extends Area<Treasure> {
  name = "out-of-use-reserve-area";

  addCards(cards: Treasure[]) {
    for (let i = 0; i < cards.length; i++) this.addCardToTop(cards[i]);
  }
  removeCards(cards_id: UUID[]) {
    const cards: Treasure[] = [];
    for (let i = 0; i < cards_id.length; i++) {
      const index = this.content.findIndex(({ id }) => id === cards_id[i]);
      if (index > -1) {
        const poppedCard = this.popCardByIndex(index);
        if (poppedCard.length) cards.push(poppedCard[0]);
      }
    }

    return cards;
  }

  retrieveTreasures(): Treasure[] {
    const treasures: Treasure[] = [];
    while (this.content.length) treasures.push(this.popCardByIndex(0)[0]);

    return treasures;
  }
}
