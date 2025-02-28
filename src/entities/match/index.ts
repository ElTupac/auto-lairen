import { randomUUID, UUID } from "crypto";
import { Player } from "../player";
import { Board } from "../board";
import { Turn } from "./turn";

let currentMatch: Match | undefined;

export const getCurrentMatch: () => Match | undefined = () => currentMatch;

export class Match {
  private _id: UUID;
  private _player_1: Player;
  private _player_2: Player;
  private _board: Board;
  private _current_turn: number = 0;
  private _current_turn_entity: Turn;
  private _started: boolean = false;
  private _paused: boolean = false;

  get paused() {
    return this._paused;
  }
  pause() {
    if (!this.paused) {
      this._paused = true;
    }
  }
  resume() {
    if (this.paused) {
      this._paused = false;
    }
  }

  start(first_turn: "player_1" | "player_2") {
    if (!this._started) {
      this._started = true;

      const startTurn = (
        turn_player_owner_id: UUID,
        turn_player_not_owner_id: UUID
      ) => {
        this._current_turn_entity = new Turn(
          {
            turn_number: this._current_turn,
            _player_owner_id: turn_player_owner_id,
            on_end_turn: () =>
              startTurn(turn_player_not_owner_id, turn_player_owner_id),
          },
          this
        );
      };
      if (first_turn === "player_1")
        startTurn(this._player_1.id, this.player_2.id);
      else if (first_turn === "player_2")
        startTurn(this._player_2.id, this._player_2.id);
    }
  }

  constructor(match: { player_1: Player; player_2: Player }) {
    if (!currentMatch) currentMatch = this;
    else throw new Error("Match already started");
    this._id = randomUUID();
    this._player_1 = match.player_1;
    this._player_2 = match.player_2;

    this._board = new Board(
      {
        deck_player_1: this._player_1.deck,
        deck_player_2: this._player_2.deck,
      },
      {
        player_1: match.player_1,
        player_2: match.player_2,
      }
    );

    match.player_1.giveOwnBoard(this._board.areas.player_1);
    match.player_2.giveOwnBoard(this._board.areas.player_2);
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
  get board() {
    return this._board;
  }

  get current_turn() {
    return this._current_turn_entity;
  }

  getPlayerById(id: UUID): {
    player: Player;
    name: "player_1" | "player_2";
  } {
    if (this._player_1.id === id)
      return { player: this._player_1, name: "player_1" };
    if (this._player_2.id === id)
      return { player: this._player_2, name: "player_2" };
  }
}
