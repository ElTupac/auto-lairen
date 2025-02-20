import { randomUUID } from "crypto";
import { Command } from "../entities/extensions/command";
import { Player } from "../entities/player";
import { emitEvent } from "../events/event-manager";

export class DrawCard extends Command {
  private _player: Player;

  constructor(player: Player) {
    super();
    this._player = player;

    emitEvent("player.draw-card", {
      origin_order: null,
      origin_permanent: null,
      origin_type: "interaction",
      data: this,
    });
  }

  execute() {
    const cardToDraw = this._player.deck.kingdom.drawCard();
    if (!cardToDraw.length)
      throw new Error(`${this._player.id} lose, couldn't draw cards`);
    this._player.playerHand.addCards(cardToDraw);
  }
}
