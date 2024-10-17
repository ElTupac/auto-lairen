import { randomUUID, UUID } from "crypto";

type PermanentPayload = {
  origin: "monument" | "unit" | "weapon" | null;
  origin_id: UUID | null;
};

export abstract class Permanent {
  private _id: UUID;
  private _origin: "monument" | "unit" | "weapon" | null;
  private _origin_id: UUID | null;

  constructor(permanent: PermanentPayload) {
    this._id = randomUUID();
    this._origin = permanent.origin;
    this._origin_id = permanent.origin_id;
  }

  get id() {
    return this._id;
  }
  get origin() {
    return this._origin;
  }
  get origin_id() {
    return this._origin_id;
  }
}
