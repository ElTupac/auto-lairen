import { Base } from "../../../commons/base";
import { Connection } from "../../../interface/interface-type";

export class Player extends Base {
  private _connection: Connection;
  private _ready: boolean = false;

  constructor(player: { connection: Connection }) {
    super();
    this._connection = player.connection;
  }

  get connection() {
    return this._connection;
  }

  get ready() {
    return this._ready;
  }

  isReady() {
    this._ready = true;
  }
}
