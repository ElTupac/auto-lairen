import { Base } from "../commons/base";
import { Event } from "../commons/event";
import { Connection } from "../interface/interface-type";
import { Match } from "../match/match";
import { ConnectedEvent } from "./events/connected.event";

export class Player extends Base {
  private _connection: Connection;

  private _match: Match;

  private _ready: boolean = false;

  constructor(player: { connection: Connection }) {
    super();
    this._connection = player.connection;
  }

  get connection() {
    return this._connection;
  }

  receiveEvent(event: Event) {
    this._connection.onAction(event);
  }

  connectMatch(match: Match) {
    this._match = match;
    this._match.emitEvent(new ConnectedEvent(this));
  }

  get ready() {
    return this._ready;
  }

  isReady() {
    this._ready = true;
  }
}
