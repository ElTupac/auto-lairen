import { PermanentEventsDefinitions } from "./permanent";
import { PlayerEventsDefinitions } from "./player";

export type EventsDefinitions = PermanentEventsDefinitions &
  PlayerEventsDefinitions;
