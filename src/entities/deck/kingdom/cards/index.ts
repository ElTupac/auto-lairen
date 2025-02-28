import { GetMatch } from "../../../../decorators/get-match";
import { CardSchema } from "../../../../schemas/cards";
import { Area } from "../../../extensions/area";
import { Card } from "../../../extensions/card";
import { Stackable } from "../../../extensions/stackable";
import { Match } from "../../../match";
import { MainPhase } from "../../../match/turn/phases/main-phase";
import { HandArea } from "../../../player/areas/hand-area";

export abstract class KingdomCard<T> extends Card<CardSchema<T>> {
  abstract play(...args: unknown[]): Promise<Stackable>;
  abstract additional_cost?(...args: unknown[]): Promise<boolean>;
  abstract get cost(): number;

  @GetMatch()
  match: () => Match;

  playable_from: (typeof Area)[] = [HandArea];
  get is_playable(): boolean {
    const currentMatch = this.match();
    if (
      !(this.schema.attributes || []).includes("quick") &&
      !(
        currentMatch.current_turn.currentPhase instanceof MainPhase &&
        currentMatch.current_turn.currentPhase.stack.stack_is_clean
      )
    )
      return false;
    if (!this.playable_from.some((Area) => this.area instanceof Area))
      return false;
    return this.owner.board.reserve.availableTreasures >= this.cost;
  }
}
