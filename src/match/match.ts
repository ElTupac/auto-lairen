import { Player } from "../player/player";
import { Base } from "../commons/base";
import { Event } from "../commons/event";
import { WaitingConnectionEvent } from "./events/waiting-connections.event";
import { UUID } from "crypto";
import { MatchStartedEvent } from "./events/match-started.event";

export class Match extends Base {
  private _match_started: boolean = false;

  private _connection: (event: Event) => void;
  private _players: Player[] = [];

  constructor(connection: (event: Event) => void) {
    super();
    this._connection = connection;

    this._connection(new WaitingConnectionEvent());
  }

  emitEvent(event: Event) {
    // TODO: logic for event distribution
    this._connection(event);
  }

  addPlayer(player: Player) {
    if (!this._players.some((_) => _.connection.id === player.connection.id)) {
      player.connectMatch(this);
      if (!this._match_started) {
        player.receiveEvent(new WaitingConnectionEvent());
      }
      this._players.push(player);
    }
  }

  startMatch(players_id: UUID[]) {
    const playersConnected = this._players.filter((_) =>
      players_id.includes(_.id)
    );
    if (
      playersConnected.length > 0 &&
      !playersConnected.some((_) => !_.ready)
    ) {
      this._match_started = true;
      this._connection(new MatchStartedEvent());
    }
  }
}
