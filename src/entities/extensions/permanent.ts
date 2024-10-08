import { randomUUID, UUID } from "crypto";

export abstract class Permanent {
  private _id: UUID;

  constructor() {
    this._id = randomUUID();
  }

  get id() {
    return this._id;
  }
}
