import { GeneralPermanent } from "../entities/board/permanents";
import { KingdomCard } from "../entities/deck/kingdom/cards";
import { Command } from "../entities/extensions/command";
import { Player } from "../entities/player";
import { emitEvent } from "../events/event-manager";
import { BoardMoveCardToArea } from "./board/board-move-card-to-area";

export class DiscardCard extends Command {
  private _player: Player;
  private _card: KingdomCard<unknown>;
  private _origin: {
    order?: KingdomCard<unknown>;
    permanent?: GeneralPermanent;
    type: "effect" | "order" | "permanent" | "interaction";
  };

  constructor(
    player: Player,
    card: KingdomCard<unknown>,
    origin: {
      order?: KingdomCard<unknown>;
      permanent?: GeneralPermanent;
      type: "effect" | "order" | "permanent" | "interaction";
    }
  ) {
    super();
    this._card = card;
    this._player = player;
    this._origin = origin;

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
    new BoardMoveCardToArea(this._card, this._player.board.discard, {
      type: this._origin.type,
      order: this._origin.order,
      permanent: this._origin.permanent,
    });
  }
}
