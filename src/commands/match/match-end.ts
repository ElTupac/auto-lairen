import { Command } from "../../entities/extensions/command";
import { emitEvent } from "../../events/event-manager";

export class MatchEnd extends Command {
  constructor() {
    super();

    emitEvent("match.end", {
      origin_order: null,
      origin_permanent: null,
      origin_type: "interaction",
      data: this,
    });
  }

  execute() {
    process.exit(0);
  }
}
