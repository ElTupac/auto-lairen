import { Base } from "../../../commons/base";
import { Connection } from "../../../interface/interface-type";

export class Spectator extends Base {
  private _connection: Connection;

  constructor(spectator: { connection: Connection }) {
    super();
    this._connection = spectator.connection;
  }

  get connection() {
    return this._connection;
  }
}
