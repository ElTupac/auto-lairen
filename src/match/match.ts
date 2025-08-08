import { UUID } from "crypto";

export type Event = {
  id: UUID;
};

export class Match {
  private _connection: (event: Event) => void;

  constructor(connection: (event: Event) => void) {
    this._connection = connection;
  }

  emitEvent(event: Event) {
    console.log("Input event");
    console.log(event);
  }
}
