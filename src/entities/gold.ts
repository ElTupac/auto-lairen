import { randomUUID, UUID } from "crypto";

export class Gold {
  private _id: UUID;
  private _used: boolean = false;

  constructor() {
    this._id = randomUUID();
  }

  use() {
    if (!this._used) {
      this._used = true;
    } else throw new Error("Gold can only be used once");
  }

  get id() {
    return this._id;
  }
  get used() {
    return this._used;
  }
}
