import { DestroyAllBoardUnits } from "../../src/commands/destroy-all-board-units";
import { ActionCard } from "../../src/entities/deck/kingdom/cards/action-card";
import { Stackable } from "../../src/entities/extensions/stackable";
import { CardSchema } from "../../src/schemas/cards";
import { ActionCardSchema } from "../../src/schemas/cards/action-card.schema";

export class Card002 extends ActionCard {
  schema: CardSchema<ActionCardSchema> = {
    cost: 4,
    name: "Balanza de cadáveres",
    description: "Destruye todas las unidades.",
    subtype: [],
    type: "action",
    attributes: ["quick"],
    data: {},
  };

  async play(): Promise<Stackable> {
    return new Stackable({
      resolution: () => {
        new DestroyAllBoardUnits(this.match().board, {
          type: "order",
          order: this,
        });
      },
      source: "action",
      type: "order",
    });
  }

  additional_cost: undefined;
}
