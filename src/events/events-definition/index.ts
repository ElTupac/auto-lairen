import { BoardEventsDefinitions } from "./board";
import { PermanentEventsDefinitions } from "./permanent";
import { PlayerEventsDefinitions } from "./player";

export type EventsDefinitions = PermanentEventsDefinitions &
  PlayerEventsDefinitions &
  BoardEventsDefinitions;
