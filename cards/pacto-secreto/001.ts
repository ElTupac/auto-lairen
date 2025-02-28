import { IncreaseHp } from "../../src/commands/increase-hp";
import {
  TargetPlayer,
  TargetPlayerProperty,
} from "../../src/decorators/target-player";
import { ActionCard } from "../../src/entities/deck/kingdom/cards/action-card";
import { Stackable } from "../../src/entities/extensions/stackable";
import { CardSchema } from "../../src/schemas/cards";
import { ActionCardSchema } from "../../src/schemas/cards/action-card.schema";

export class Card001 extends ActionCard {
  schema: CardSchema<ActionCardSchema> = {
    cost: 1,
    name: "Agua en el desierto",
    description: "El jugador objetivo gana 5 vidas.",
    subtype: [],
    type: "action",
    attributes: ["quick"],
    data: {},
  };

  @TargetPlayer()
  targetPlayer: TargetPlayerProperty;

  async play() {
    const player = await this.targetPlayer(this.owner);

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
