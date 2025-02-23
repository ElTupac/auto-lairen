import { UUID } from "crypto";
import { Area } from "../../extensions/area";
import { UnitCard } from "../../deck/kingdom/cards/unit-card";

export class FormationArea extends Area {
  name = "formation-area";

  addCards(cards: UnitCard[]) {
    for (let i = 0; i < cards.length; i++) this.addCardToTop(cards[i]);
  }
  removeCards(cards_id: UUID[]) {
    const cards: UnitCard[] = [];
    for (let i = 0; i < cards_id.length; i++) {
      const index = this.content.findIndex(({ id }) => id === cards_id[i]);
      if (index > -1) {
        const poppedCard = this.popCardByIndex(index);
        if (poppedCard.length) cards.push(poppedCard[0] as UnitCard);
      }
    }

    return cards;
  }
}
