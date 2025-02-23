import { randomUUID, UUID } from "crypto";
import { Area } from "./area";
import { Player } from "../player";

export abstract class Card<T> {
  private _id: UUID;
  private _area?: Area;
  private _owner?: Player;
  private _controller?: Player;
  schema: T;

  constructor(startingArea?: Area) {
    this._id = randomUUID();
    this._area = startingArea;
  }

  takeOwn(player: Player) {
    if (!this._owner) {
      this._owner = player;
      if (!this._controller) this._controller = player;
    }
  }
  takeControl(player: Player) {
    this._controller = player;
  }

  moveToArea(newArea: Area) {
    this._area = newArea;
  }

  get id() {
    return this._id;
  }

  get area() {
    return this._area;
  }

  get owner() {
    return this._owner;
  }
}
