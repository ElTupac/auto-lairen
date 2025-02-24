import { Card } from "../../../extensions/card";
import { Stackable } from "../../../extensions/stackable";
import { HandArea } from "../../../player/areas/hand-area";

export abstract class KingdomCard<T> extends Card<T> {
  abstract play(...args: unknown[]): Promise<Stackable>;
  abstract additional_cost?(...args: unknown[]): Promise<boolean>;
  abstract get cost(): number;

  get is_playable(): boolean {
    if (!(this.area instanceof HandArea)) return false;
    return this.owner.board.reserve.availableTreasures >= this.cost;
  }
}
