import { PermanentUnitCreate } from "../../src/commands/permanents/permanent-unit-create";
import { GetMatch } from "../../src/decorators/get-match";
import { ActionCard } from "../../src/entities/deck/kingdom/cards/action-card";
import { Stackable } from "../../src/entities/extensions/stackable";
import { Match } from "../../src/entities/match";
import { ActionCardSchema } from "../../src/schemas/cards/action-card.schema";

export class Card011 extends ActionCard {
  schema: ActionCardSchema = {
    cost: 4,
    name: "Refuerzos",
    description: "Crea cuatro fichas de soldado 1/1.",
    subtype: [],
    type: "action",
    data: {
      attributes: ["quick"],
    },
  };

  @GetMatch
  match: () => Match;

  async play() {
    return new Stackable({
      resolution: () => {
        for (let i = 0; i < 4; i++) {
          new PermanentUnitCreate(
            {
              name: "Soldado",
              subtype: ["soldado"],
              data: {
                attributes: [],
                resistance: 1,
                strengh: 1,
              },
            },
            this.owner.board.formation,
            {
              type: "order",
              permanent: null,
              order: this,
            }
          );
        }
      },
      source: "action",
      type: "order",
    });
  }
  additional_cost: undefined;
}
