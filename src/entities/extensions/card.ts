import { randomUUID, UUID } from "crypto";
import { Stackable } from "./stackable";
import { Match } from "../match";
import { Area } from "./area";

export abstract class Card<T> {
  private _id: UUID;
  private _area?: Area;
  schema: T;

  play?(match: Match, ...args: unknown[]): Promise<Stackable>;
  additional_cost?(match: Match, ...args: unknown[]): Promise<boolean>;

  constructor(startingArea?: Area) {
    this._id = randomUUID();
    this._area = startingArea;
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
}
