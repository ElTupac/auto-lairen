import { ActionCard } from "../../src/entities/deck/kingdom/cards/action-card";
import { Stackable } from "../../src/entities/extensions/stackable";
import { prompt } from "../../src/prompt";
import { ActionCardSchema } from "../../src/schemas/cards/action-card.schema";

export class Card001 extends ActionCard {
  schema: ActionCardSchema = {
    cost: 1,
    name: "Agua en el desierto",
    description: "El jugador objetivo gana 5 vidas.",
    subtype: [],
    type: "action",
    data: {
      attributes: ["quick"],
    },
    additional_cost: null,
    on_play: async (match) => {
      // TODO: get objective
      const objective_player = await prompt(["player_1", "player_2"] as const);

      return new Stackable({
        resolution: () => {
          match[objective_player].addHp(5);
        },
        type: "order",
      });
    },
  };
}
