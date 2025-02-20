import { Command } from "../entities/extensions/command";
import { Player } from "../entities/player";
import { emitEvent } from "../events/event-manager";
import { DrawCard } from "./draw-card";

const CARDS_TO_DRAW = 7;

export class DrawInitialHand extends Command {
  private _player: Player;

  constructor(player: Player) {
    super();
    this._player = player;

    emitEvent("player.draw-initial-hand", {
      origin_order: null,
      origin_permanent: null,
      origin_type: "interaction",
      data: this,
    });
  }

  execute() {
    for (let i = CARDS_TO_DRAW; i > 0; i--) {
      new DrawCard(this._player);
    }
  }
}
