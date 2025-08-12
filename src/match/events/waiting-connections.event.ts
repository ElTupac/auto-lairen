import { Event } from "../../commons/event";

export class WaitingConnectionEvent extends Event {
  constructor() {
    super({
      type: "info",
      data: {
        message: "waiting connections",
      },
    });
  }
}
