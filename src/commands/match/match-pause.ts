import { GetMatch } from "../../decorators/get-match";
import { Command } from "../../entities/extensions/command";
import { Match } from "../../entities/match";
import { emitEvent } from "../../events/event-manager";

export class MatchPause extends Command {
  @GetMatch()
  match: () => Match;

  constructor() {
    super();

    emitEvent("match.pause", {
      origin_order: null,
      origin_permanent: null,
      origin_type: "interaction",
      data: this,
    });
  }

  execute() {
    this.match().pause();
  }
}
