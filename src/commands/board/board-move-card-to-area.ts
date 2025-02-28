import { GeneralPermanent } from "../../entities/board/permanents";
import { KingdomCard } from "../../entities/deck/kingdom/cards";
import { Area } from "../../entities/extensions/area";
import { Card } from "../../entities/extensions/card";
import { Command } from "../../entities/extensions/command";
import { emitEvent } from "../../events/event-manager";

export class BoardMoveCardToArea extends Command {
  private _card: Card<unknown>;
  private _area: Area;
  private _sendBottom: boolean;

  constructor(
    card: Card<unknown>,
    area: Area,
    origin: {
      order?: KingdomCard<unknown>;
      permanent?: GeneralPermanent;
      type: "effect" | "order" | "permanent" | "interaction";
    },
    sendBottom?: boolean
  ) {
    super();
    this._card = card;
    this._area = area;
    this._sendBottom = sendBottom || false;

    emitEvent("board.move-card-to-area", {
      origin_order: origin.order || null,
      origin_permanent: origin.permanent || null,
      origin_type: origin.type,
      data: this,
    });
  }

  get area() {
    return this._area;
  }
  get card() {
    return this._card;
  }

  execute() {
    this._area.moveCardToThisArea(this._card, this._sendBottom);
  }
}
