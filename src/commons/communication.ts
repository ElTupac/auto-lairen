import { Base } from "./base";

type CommunicationType = "info" | "chat" | "action" | "update";

export class Communication extends Base {
  private _type: CommunicationType;
  private _data: unknown;

  constructor(communication: { type: CommunicationType; data: unknown }) {
    super();
    this._type = communication.type;
    this._data = communication.data;
  }

  get type() {
    return this._type;
  }
  get data() {
    return this._data;
  }
}
