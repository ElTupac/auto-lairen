import { randomUUID, UUID } from "crypto";

type StackableType = "order" | "effect";

export class Stackable {
  private _id: UUID;
  private _type: StackableType;
  private _in_game: boolean;
  private _resolution: () => void;

  constructor(stackble: {
    resolution: () => void;
    type: StackableType;
    in_game?: boolean;
  }) {
    this._resolution = stackble.resolution;
    this._id = randomUUID();
    this._type = stackble.type;
    this._in_game = stackble.in_game || true;
  }

  resolve() {
    this._resolution();
  }
  get id() {
    return this._id;
  }
  get type() {
    return this._type;
  }
  get in_game() {
    return this._in_game;
  }
}
