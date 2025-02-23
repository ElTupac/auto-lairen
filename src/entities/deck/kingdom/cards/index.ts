import { Card } from "../../../extensions/card";
import { Stackable } from "../../../extensions/stackable";

export abstract class KingdomCard<T> extends Card<T> {
  abstract play(...args: unknown[]): Promise<Stackable>;
  abstract additional_cost?(...args: unknown[]): Promise<boolean>;
  abstract get cost(): number;
}
