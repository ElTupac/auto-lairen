import { Command } from "../entities/extensions/command";
import { Player } from "../entities/player";

export class ReduceHp extends Command {
  private _player: Player;
  private _quantity: number;

  constructor(player: Player, quantity) {
    super();
    this._player = player;
    this._quantity = quantity;
  }

  execute() {
    this._player.updateHp(-this._quantity);
  }
}
