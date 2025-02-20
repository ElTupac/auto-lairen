import { randomUUID, UUID } from "crypto";
import { KingdomCard } from "../deck/kingdom/cards";
import { PermanentDead } from "../../commands/permanents/permanent-dead";
import { GeneralPermanent } from "../board/permanents";

type PermanentPayload<S> = {
  origin: "monument" | "unit" | "weapon" | "unit-monument" | null;
  origin_order: KingdomCard | null;
  origin_id: UUID | null;
  schema: S;
};

export abstract class Permanent<T> {
  private _id: UUID;
  private _origin: "monument" | "unit" | "weapon" | "unit-monument" | null;
  private _origin_order: KingdomCard | null;
  private _origin_id: UUID | null;
  private _schema: T;

  constructor(permanent: PermanentPayload<T>) {
    this._id = randomUUID();
    this._origin = permanent.origin;
    this._origin_order = permanent.origin_order;
    this._origin_id = permanent.origin_id;
    this._schema = permanent.schema;
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

  destroy(): Promise<{ success: boolean }> {
    new PermanentDead(this as GeneralPermanent);

    return new Promise((resolve) =>
      setTimeout(() => resolve({ success: true }), 500)
    );
  }
  dead(): Promise<{ success: boolean }> {
    if (this._origin_order?.owner) {
      this.origin_order.owner.board.discard.moveCardToThisArea(
        this.origin_order
      );

      return new Promise((resolve) =>
        setTimeout(() => resolve({ success: true }), 500)
      );
    }

    return new Promise((resolve) =>
      setTimeout(() => resolve({ success: false }), 500)
    );
  }
  condemn(): Promise<{ success: boolean }> {
    if (this.origin_order?.owner) {
      this.origin_order.owner.board.hell.moveCardToThisArea(this.origin_order);

      return new Promise((resolve) =>
        setTimeout(() => resolve({ success: true }), 500)
      );
    }

    return new Promise((resolve) =>
      setTimeout(() => resolve({ success: false }), 500)
    );
  }
  returnHand(): Promise<{ success: boolean }> {
    if (this.origin_order?.owner) {
      this.origin_order.owner.playerHand.moveCardToThisArea(this.origin_order);

      return new Promise((resolve) =>
        setTimeout(() => resolve({ success: true }), 500)
      );
    }

    return new Promise((resolve) =>
      setTimeout(() => resolve({ success: false }), 500)
    );
  }
  sendToKingdomEnd(): Promise<{ success: boolean }> {
    if (this.origin_order?.owner) {
      this.origin_order.owner.deck.kingdom.moveCardToThisArea(
        this.origin_order,
        true
      );

      return new Promise((resolve) =>
        setTimeout(() => resolve({ success: true }), 500)
      );
    }

    return new Promise((resolve) =>
      setTimeout(() => resolve({ success: false }), 500)
    );
  }
  sendToKingdomTop(): Promise<{ success: boolean }> {
    if (this.origin_order?.owner) {
      this.origin_order.owner.deck.kingdom.moveCardToThisArea(
        this.origin_order
      );

      return new Promise((resolve) =>
        setTimeout(() => resolve({ success: true }), 500)
      );
    }

    return new Promise((resolve) =>
      setTimeout(() => resolve({ success: false }), 500)
    );
  }
}
