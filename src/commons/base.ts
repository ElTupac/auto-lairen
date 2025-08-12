import { randomUUID, UUID } from "crypto";

export class Base {
  private _id: UUID;

  constructor() {
    this._id = randomUUID();
  }

  get id() {
    return this._id;
  }
}
