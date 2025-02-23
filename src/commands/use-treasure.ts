import { ReserveArea } from "../entities/board/areas/reserve-area";
import { Command } from "../entities/extensions/command";
import { Treasure } from "../entities/extensions/treasure";
import { Gold } from "../entities/gold";
import { Player } from "../entities/player";
import { emitEvent } from "../events/event-manager";

export class UseTreasure extends Command {
  private _player: Player;
  private _treasure: Treasure;
  private _goldFn: (gold: Gold[]) => void;

  constructor(
    treasure: Treasure,
    player: Player,
    goldFn: (gold: Gold[]) => void
  ) {
    super();
    this._player = player;
    this._treasure = treasure;
    this._goldFn = goldFn;

    if (treasure.owner.id !== player.id)
      throw new Error("Treasure to use must be from same player");

    if (!(treasure.area instanceof ReserveArea))
      throw new Error("Treasure to use must be in reserve area");

    emitEvent("player.use-treasure", {
      origin_order: null,
      origin_permanent: null,
      origin_type: "interaction",
      data: this,
    });
  }

  execute() {
    this._player.board.out_of_use_reserve.moveCardToThisArea(this._treasure);
    this._goldFn([new Gold()]);
  }
}
