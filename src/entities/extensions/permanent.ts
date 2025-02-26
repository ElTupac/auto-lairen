import { randomUUID, UUID } from "crypto";
import { PermanentDead } from "../../commands/permanents/permanent-dead";
import { GeneralPermanent } from "../board/permanents";
import { KingdomCard } from "../deck/kingdom/cards";

type PermanentPayload<S> = {
  origin: "monument" | "unit" | "weapon" | "unit-monument" | null;
  origin_order: KingdomCard<unknown> | null;
  origin_id: UUID | null;
  linked_card: KingdomCard<unknown>;
  schema: S;
};

export abstract class Permanent<T> {
  private _id: UUID;
  private _origin: "monument" | "unit" | "weapon" | "unit-monument" | null;
  private _origin_order: KingdomCard<unknown> | null;
  private _origin_id: UUID | null;
  private _schema: T;
  private _linked_card: KingdomCard<unknown>;

  constructor(permanent: PermanentPayload<T>) {
    this._id = randomUUID();
    this._origin = permanent.origin;
    this._origin_order = permanent.origin_order;
    this._origin_id = permanent.origin_id;
    this._schema = permanent.schema;
    this._linked_card = permanent.linked_card;
  }

  get id() {
    return this._id;
  }
  get origin() {
    return this._origin;
  }
  get origin_order() {
    return this._origin_order;
  }
  get origin_id() {
    return this._origin_id;
  }
  get schema() {
    return this._schema;
  }
  get linked_card() {
    return this._linked_card;
  }

  destroy(): Promise<{ success: boolean }> {
    new PermanentDead(this as GeneralPermanent);

    return new Promise((resolve) =>
      setTimeout(() => resolve({ success: true }), 500)
    );
  }
  dead(): Promise<{ success: boolean }> {
    this.linked_card.owner.board.discard.moveCardToThisArea(this.linked_card);

    return new Promise((resolve) =>
      setTimeout(() => resolve({ success: true }), 500)
    );
  }
  condemn(): Promise<{ success: boolean }> {
    this.linked_card.owner.board.hell.moveCardToThisArea(this.linked_card);

    return new Promise((resolve) =>
      setTimeout(() => resolve({ success: true }), 500)
    );
  }
  returnHand(): Promise<{ success: boolean }> {
    this.linked_card.owner.playerHand.moveCardToThisArea(this.linked_card);

    return new Promise((resolve) =>
      setTimeout(() => resolve({ success: true }), 500)
    );
  }
  sendToKingdomEnd(): Promise<{ success: boolean }> {
    this.linked_card.owner.deck.kingdom.moveCardToThisArea(
      this.linked_card,
      true
    );

    return new Promise((resolve) =>
      setTimeout(() => resolve({ success: true }), 500)
    );
  }
  sendToKingdomTop(): Promise<{ success: boolean }> {
    this.linked_card.owner.deck.kingdom.moveCardToThisArea(this.linked_card);

    return new Promise((resolve) =>
      setTimeout(() => resolve({ success: true }), 500)
    );
  }
}
