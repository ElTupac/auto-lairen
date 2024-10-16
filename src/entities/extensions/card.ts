import { randomUUID, UUID } from "crypto";

export abstract class Card<T> {
  private _id: UUID;
  schema: T;

  constructor() {
    this._id = randomUUID();
  }

  get id() {
    return this._id;
  }
}
