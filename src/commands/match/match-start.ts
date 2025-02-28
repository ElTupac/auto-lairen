import { Command } from "../../entities/extensions/command";
import { Match } from "../../entities/match";
import { emitEvent } from "../../events/event-manager";

export class MatchStart extends Command {
  private _match: Match;
  private _first_turn: "player_1" | "player_2";

  constructor(match: Match, first_turn?: "player_1" | "player_2") {
    super();
    this._match = match;
    this._first_turn = first_turn || "player_1";

    emitEvent("match.start", {
      origin_order: null,
      origin_permanent: null,
      origin_type: "interaction",
      data: this,
    });
  }

  execute() {
    this._match.start(this._first_turn);
  }
}
