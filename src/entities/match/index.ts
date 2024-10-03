import { randomUUID, UUID } from "crypto";
import { Player } from "../player";
import { Board } from "../board";

export class Match {
  private _id: UUID;
  private _player_1: Player;
  private _player_2: Player;

  board: Board;

  constructor(match: { player_1: Player; player_2: Player }) {
    this._id = randomUUID();
    this._player_1 = match.player_1;
    this._player_2 = match.player_2;

    this.board = new Board({
      deck_player_1: this._player_1.deck,
      deck_player_2: this._player_2.deck,
    });
  }

  get id() {
    return this._id;
  }

  get player_1() {
    return this._player_1;
  }
  get player_2() {
    return this._player_2;
  }
}
