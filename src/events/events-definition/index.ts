import { BattleEventsDefinition } from "./battle";
import { BoardEventsDefinitions } from "./board";
import { MatchEventsDefinitions } from "./match";
import { PermanentEventsDefinitions } from "./permanent";
import { PlayerEventsDefinitions } from "./player";

export type EventsDefinitions = PermanentEventsDefinitions &
  PlayerEventsDefinitions &
  BoardEventsDefinitions &
  BattleEventsDefinition &
  MatchEventsDefinitions;
