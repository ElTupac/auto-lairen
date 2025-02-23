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

  constructor(match: {
    player_1: Player;
    player_2: Player;
    first_turn: "player_1" | "player_2";
  }) {
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

    const startTurn = (
      turn_player_owner_id: UUID,
      turn_player_not_owner_id: UUID
    ) => {
      new Turn(
        {
          turn_number: this._current_turn,
          _player_owner_id: turn_player_owner_id,
          on_end_turn: () =>
            startTurn(turn_player_not_owner_id, turn_player_owner_id),
        },
        this
      );
    };
    if (match.first_turn === "player_1")
      startTurn(this._player_1.id, this.player_2.id);
    else if (match.first_turn === "player_2")
      startTurn(this._player_2.id, this._player_2.id);
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
