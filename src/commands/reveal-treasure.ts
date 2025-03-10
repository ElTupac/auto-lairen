import { GeneralPermanent } from "../entities/board/permanents";
import { KingdomCard } from "../entities/deck/kingdom/cards";
import { Command } from "../entities/extensions/command";
import { Treasure } from "../entities/extensions/treasure";
import { Player } from "../entities/player";
import { emitEvent } from "../events/event-manager";
import { BoardMoveCardToArea } from "./board/board-move-card-to-area";

export class RevealTreasure extends Command {
  private _player: Player;
  private _origin: {
    order?: KingdomCard<unknown>;
    permanent?: GeneralPermanent;
    type: "effect" | "order" | "permanent" | "interaction";
  };

  constructor(
    player: Player,
    origin: {
      order?: KingdomCard<unknown>;
      permanent?: GeneralPermanent;
      type: "effect" | "order" | "permanent" | "interaction";
    }
  ) {
    super();

    this._player = player;
    this._origin = origin;

    if (this._player.board.vault.content[0]) {
      emitEvent("player.reveal-treasure", {
        origin_order: origin.order || null,
        origin_permanent: origin.permanent || null,
        origin_type: origin.type,
        data: this,
      });
    }
  }

  execute() {
    const cardToReveal = this._player.board.vault.content[0] as Treasure;
    if (cardToReveal) {
      new BoardMoveCardToArea(cardToReveal, this._player.board.reserve, {
        type: this._origin.type,
        order: this._origin.order,
        permanent: this._origin.permanent,
      });
    }
  }
}
