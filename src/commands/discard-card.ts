import { GeneralPermanent } from "../entities/board/permanents";
import { KingdomCard } from "../entities/deck/kingdom/cards";
import { Command } from "../entities/extensions/command";
import { Player } from "../entities/player";
import { emitEvent } from "../events/event-manager";

export class DiscardCard extends Command {
  private _player: Player;
  private _card: KingdomCard;

  constructor(
    player: Player,
    card: KingdomCard,
    origin: {
      order?: KingdomCard;
      permanent?: GeneralPermanent;
      type: "effect" | "order" | "permanent" | "interaction";
    }
  ) {
    super();
    this._card = card;
    this._player = player;

    if (card.owner.id !== player.id)
      throw new Error("Card to discard must be from same player");

    emitEvent("player.discard-card", {
      origin_order: origin.order || null,
      origin_permanent: origin.permanent || null,
      origin_type: origin.type,
      data: this,
    });
  }

  execute() {
    this._player.board.discard.moveCardToThisArea(this._card);
  }
}
