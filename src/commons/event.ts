import { Base } from "./base";

type EventType = "info" | "setup";

export class Event extends Base {
  private _type: EventType;
  private _data: unknown;

  constructor(event: { type: EventType; data: unknown }) {
    super();

    this._type = event.type;
    this._data = event.data;
  }

  get type() {
    return this._type;
  }

  get data() {
    return this._data;
  }
}
