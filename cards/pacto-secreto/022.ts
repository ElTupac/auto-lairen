import { UnitPermanent } from "../../src/entities/board/permanents";
import { UnitCard } from "../../src/entities/deck/kingdom/cards/unit-card";
import { Stackable } from "../../src/entities/extensions/stackable";
import { UnitCardSchema } from "../../src/schemas/cards/unit-card.schema";

export class Card022 extends UnitCard {
  schema: UnitCardSchema = {
    cost: 2,
    name: "Amiga de los arboles",
    description:
      "Frenesí. Siempre que esta unidad haga daño de combate a un jugador, crea una copia de esta unidad.",
    subtype: ["animal"],
    type: "unit",
    data: {
      attributes: [],
      resistance: 1,
      strengh: 2,
    },
  };

  async play(): Promise<Stackable> {
    return new Stackable({
      resolution: () => {
        new UnitPermanent({
          origin_id: this.id,
          origin_order: this,
          schema: this.schema,
        });
      },
      source: "unit",
      type: "order",
    });
  }

  additional_cost: undefined;
}
