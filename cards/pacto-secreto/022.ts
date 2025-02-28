import { BoardMoveCardToArea } from "../../src/commands/board/board-move-card-to-area";
import { PermanentUnitCreate } from "../../src/commands/permanents/permanent-unit-create";
import { CardEnterField } from "../../src/decorators/card-enter-field";
import { UnitCard } from "../../src/entities/deck/kingdom/cards/unit-card";
import { Stackable } from "../../src/entities/extensions/stackable";
import { CardSchema } from "../../src/schemas/cards";
import { UnitCardSchema } from "../../src/schemas/cards/unit-card.schema";

export class Card022 extends UnitCard {
  schema: CardSchema<UnitCardSchema> = {
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

  @CardEnterField()
  permanent() {
    new PermanentUnitCreate(
      this.schema,
      this.area,
      {
        type: "order",
        order: this,
        permanent: null,
      },
      this
    );
  }

  async play(): Promise<Stackable> {
    return new Stackable({
      resolution: () => {
        new BoardMoveCardToArea(this, this.owner.board.formation, {
          type: "order",
          order: this,
          permanent: null,
        });
      },
      source: "unit",
      type: "order",
    });
  }

  additional_cost: undefined;
}
