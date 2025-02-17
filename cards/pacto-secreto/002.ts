import { DestroyAllBoardUnits } from "../../src/commands/destroy-all-board-units";
import { ActionCard } from "../../src/entities/deck/kingdom/cards";
import { Stackable } from "../../src/entities/extensions/stackable";
import { Match } from "../../src/entities/match";
import { ActionCardSchema } from "../../src/schemas/cards/action-card.schema";

export class Card002 extends ActionCard {
  schema: ActionCardSchema = {
    cost: 4,
    name: "Balanza de cadáveres",
    description: "Destruye todas las unidades.",
    subtype: [],
    type: "action",
    data: { attributes: ["quick"] },
  };

  async play(match: Match): Promise<Stackable> {
    return new Stackable({
      resolution: () => {
        new DestroyAllBoardUnits(match.board).execute();
      },
      source: "action",
      type: "order",
    });
  }
}
