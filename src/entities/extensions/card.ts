import { randomUUID, UUID } from "crypto";
import { ActionCardSchema } from "../../schemas/cards/action-card.schema";

export abstract class Card {
  private _id: UUID;
  schema: ActionCardSchema;

  constructor() {
    this._id = randomUUID();
  }

  get id() {
    return this._id;
  }
}
