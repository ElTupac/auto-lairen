import { DestroyAllBoardUnits } from "../../src/commands/destroy-all-board-units";
import { GetMatch } from "../../src/decorators/get-match";
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

  async play(@GetMatch match: Match): Promise<Stackable> {
    return new Stackable({
      resolution: () => {
        new DestroyAllBoardUnits(match.board);
      },
      source: "action",
      type: "order",
    });
  }

  additional_cost: undefined;
}
