import { ReduceHp } from "../../commands/reduce-hp";
import { DrawCard } from "../../commands/draw-card";
import { IncreaseHp } from "../../commands/increase-hp";
import { EventDefinition } from "../event-type";
import { DrawInitialHand } from "../../commands/draw-initial-hand";
import { DiscardCard } from "../../commands/discard-card";
import { UseTreasure } from "../../commands/use-treasure";
import { RevealTreasure } from "../../commands/reveal-treasure";
import { PayOrderCost } from "../../commands/pay-order-cost";
import { PlayOrder } from "../../commands/play-order";

export type PlayerEventsDefinitions = {
  "player.draw-card": EventDefinition<DrawCard>;
  "player.discard-card": EventDefinition<DiscardCard>;
  "player.reduce-hp": EventDefinition<ReduceHp>;
  "player.increase-hp": EventDefinition<IncreaseHp>;
  "player.draw-initial-hand": EventDefinition<DrawInitialHand>;
  "player.use-treasure": EventDefinition<UseTreasure>;
  "player.reveal-treasure": EventDefinition<RevealTreasure>;
  "player.pay-order-cost": EventDefinition<PayOrderCost>;
  "player.play-order": EventDefinition<PlayOrder>;
};
