import { GetMatch } from "../decorators/get-match";
import { KingdomCard } from "../entities/deck/kingdom/cards";
import { Command } from "../entities/extensions/command";
import { Gold } from "../entities/gold";
import { Match } from "../entities/match";
import { emitEvent } from "../events/event-manager";

export class PayOrderCost extends Command {
  private _card: KingdomCard<unknown>;
  private _gold: Gold[];

  constructor(card: KingdomCard<unknown>, gold: Gold[]) {
    super();
    this._card = card;

    const usableGold = gold.filter(({ used }) => !used);
    if (card.cost > usableGold.length)
      throw new Error("Card cost is higher than the amount of gold received");
    this._gold = usableGold;

    emitEvent("player.pay-order-cost", {
      origin_order: card,
      origin_permanent: null,
      origin_type: "order",
      data: this,
    });
  }

  @GetMatch()
  match: () => Match;

  execute() {
    for (let i = 0; i < this._gold.length; i++) this._gold[i].use();
    this._card.play().then((stackable) => {
      this.match().current_turn.currentPhase.stack.tacTheStack(stackable);
    });
  }
}
