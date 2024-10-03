import { randomUUID, UUID } from "crypto";

export class Treasure {
  private _id: UUID;

  constructor() {
    this._id = randomUUID();
  }

  get id() {
    return this._id;
  }
}
