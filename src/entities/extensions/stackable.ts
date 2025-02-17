import { randomUUID, UUID } from "crypto";

type StackableType = "order" | "effect";
type StackableSource = "treasure" | "unit" | "monument" | "action" | "weapon";

export class Stackable {
  private _id: UUID;
  private _type: StackableType;
  private _source: StackableSource;
  private _in_game: boolean;
  private _resolution: () => void;

  constructor(stackble: {
    resolution: () => void;
    type: StackableType;
    source: StackableSource;
    in_game?: boolean;
  }) {
    this._resolution = stackble.resolution;
    this._id = randomUUID();
    this._type = stackble.type;
    this._source = stackble.source;
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
  get source() {
    return this._source;
  }
  get in_game() {
    return this._in_game;
  }
}
