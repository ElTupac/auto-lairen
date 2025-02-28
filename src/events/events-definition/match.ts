import { MatchEnd } from "../../commands/match/match-end";
import { MatchPause } from "../../commands/match/match-pause";
import { MatchResume } from "../../commands/match/match-resume";
import { MatchStart } from "../../commands/match/match-start";
import { EventDefinition } from "../event-type";

export type MatchEventsDefinitions = {
  "match.end": EventDefinition<MatchEnd>;
  "match.pause": EventDefinition<MatchPause>;
  "match.resume": EventDefinition<MatchResume>;
  "match.start": EventDefinition<MatchStart>;
};
