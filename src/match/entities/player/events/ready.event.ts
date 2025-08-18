import { Event } from "../../commons/event";

export class ReadyEvent extends Event {
  constructor() {
    super({
      type: "setup",
      data: {
        message: "Player ready",
      },
    });
  }
}
