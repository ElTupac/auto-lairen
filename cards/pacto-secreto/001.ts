import { IncreaseHp } from "../../src/commands/increase-hp";
import { GetMatch } from "../../src/decorators/get-match";
import { TargetPlayer } from "../../src/decorators/target-player";
import { ActionCard } from "../../src/entities/deck/kingdom/cards/action-card";
import { Stackable } from "../../src/entities/extensions/stackable";
import { Match } from "../../src/entities/match";
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
  };

  @GetMatch
  match: () => Match;
  @TargetPlayer
  targetPlayer: () => Promise<"player_1" | "player_2">;

  async play() {
    const player = await this.targetPlayer();

    return new Stackable({
      resolution: () => {
        new IncreaseHp(this.match()[player], 5, {
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
