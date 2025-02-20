import { GeneralPermanent } from "../entities/board/permanents";
import { KingdomCard } from "../entities/deck/kingdom/cards";
import { Command } from "../entities/extensions/command";
import { Player } from "../entities/player";
import { emitEvent } from "../events/event-manager";

export class IncreaseHp extends Command {
  private _player: Player;
  private _quantity: number;

  constructor(
    player: Player,
    quantity: number,
    origin: {
      order?: KingdomCard;
      permanent?: GeneralPermanent;
      type: "effect" | "order" | "permanent" | "interaction";
    }
  ) {
    super();
    this._player = player;
    this._quantity = quantity;

    emitEvent("player.increase-hp", {
      origin_order: origin.order || null,
      origin_permanent: origin.permanent || null,
      origin_type: origin.type,
      data: this,
    });
  }

  execute() {
    this._player.updateHp(this._quantity);
  }
}
