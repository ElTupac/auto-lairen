import { KingdomCard } from "../entities/deck/kingdom/cards";
import { Command } from "../entities/extensions/command";
import { Gold } from "../entities/gold";
import { Player } from "../entities/player";
import { emitEvent } from "../events/event-manager";
import { prompt } from "../prompt";
import { PayOrderCost } from "./pay-order-cost";
import { UseTreasure } from "./use-treasure";

export class PlayOrder extends Command {
  private _card: KingdomCard<unknown>;
  private _gold: Gold[];

  constructor(player: Player, card: KingdomCard<unknown>) {
    super();
    this._card = card;

    if (card.owner.id !== player.id)
      throw new Error("Card to play must be from same player");

    new Promise(async () => {
      const goldToUse: Gold[] = [];

      console.log({ goldToUse });
      console.log({ cardCost: card.cost });

      const treasuresAvailable = [...player.board.reserve.content];
      for (let i = 0; i < treasuresAvailable.length; i++) {
        const treasure = treasuresAvailable[i];
        const useTreasure = await prompt([
          { label: `use ${treasure.id} to pay order`, value: "use" },
          { label: `don't`, value: "no-use" },
        ]);

        if (useTreasure.value === "use") {
          const goldReceived = await new Promise<Gold[]>((resolve) => {
            new UseTreasure(treasure, player, resolve);
          });
          for (let j = 0; j < goldReceived.length; j++)
            goldToUse.push(goldReceived[j]);
        }

        if (goldToUse.length >= card.cost) {
          break;
        }
      }

      if (goldToUse.length < card.cost)
        throw new Error("Not enough gold to pay order was provided");

      this._gold = goldToUse;

      emitEvent("player.play-order", {
        origin_order: card,
        origin_permanent: null,
        origin_type: "order",
        data: this,
      });
    });
  }

  execute() {
    new PayOrderCost(this._card, this._gold);
  }
}
