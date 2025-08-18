import { Base } from "../commons/base";
import { UUID } from "crypto";
import { Communication } from "../commons/communication";
import { Player } from "./entities/player/player";
import { Spectator } from "./entities/spectator/spectator";

export class Match extends Base {
  private _match_started: boolean = false;

  private _connection: (event: Communication) => void;
  private _players: Player[] = [];
  private _spectators: Spectator[] = [];

  constructor(connection: (event: Communication) => void) {
    super();
    this._connection = connection;
  }

  receiveCommunication(communication: Communication) {}

  addPlayer(player: Player) {
    if (!this._players.some((_) => _.connection.id === player.connection.id)) {
      this._players.push(player);
      console.log({ player });
      player.connection.onCommunication(
        new Communication({
          type: "info",
          data: {
            message: "player connected",
          },
        })
      );
    }
  }

  addSpectator(spectator: Spectator) {
    if (
      !this._spectators.some((_) => _.connection.id === spectator.connection.id)
    ) {
      this._spectators.push(spectator);
      spectator.connection.onCommunication(
        new Communication({
          type: "info",
          data: {
            message: "spectator connected",
          },
        })
      );
    }
  }

  startMatch(players_id: UUID[]) {
    const playersConnected = this._players.filter((_) =>
      players_id.includes(_.id)
    );
    if (
      !this._match_started &&
      playersConnected.length > 0 &&
      !playersConnected.some((_) => !_.ready)
    ) {
      this._match_started = true;
    }
  }

  get match_started() {
    return this._match_started;
  }
}
