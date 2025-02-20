import { ReduceHp } from "../../commands/reduce-hp";
import { DrawCard } from "../../commands/draw-card";
import { IncreaseHp } from "../../commands/increase-hp";
import { EventDefinition } from "../event-type";
import { DrawInitialHand } from "../../commands/draw-initial-hand";

export type PlayerEventsDefinitions = {
  "player.draw-card": EventDefinition<DrawCard>;
  "player.reduce-hp": EventDefinition<ReduceHp>;
  "player.increase-hp": EventDefinition<IncreaseHp>;
  "player.draw-initial-hand": EventDefinition<DrawInitialHand>;
};
