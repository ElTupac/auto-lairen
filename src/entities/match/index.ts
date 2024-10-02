import { randomUUID, UUID } from "crypto";
import { Player } from "../player";

export class Match {
  private _id: UUID;
  player_1: Player;
  player_2: Player;

  constructor(match: { player_1: Player; player_2: Player }) {
    this._id = randomUUID();
    this.player_1 = match.player_1;
    this.player_2 = match.player_2;
  }

  get id() {
    return this._id;
  }
}
