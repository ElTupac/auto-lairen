import { Event } from "../../commons/event";

export class MatchStartedEvent extends Event {
  constructor() {
    super({
      type: "info",
      data: {
        message: "match started",
      },
    });
  }
}
