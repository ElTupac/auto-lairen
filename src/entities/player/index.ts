import { randomUUID, UUID } from "crypto";
import { HandArea } from "./areas/hand-area";
import { Deck } from "../deck";
import { PlayerOwnBoard } from "../board";

export class Player {
  private _id: UUID;
  private _deck: Deck;
  private _board: PlayerOwnBoard;
  private _hp: number;
  playerHand: HandArea;

  constructor(player?: { deck?: Deck; initialHp?: number }) {
    this._id = randomUUID();
    this._hp = player?.initialHp || 20;
    this._deck = player?.deck;
    this.playerHand = new HandArea(this);
  }

  get id() {
    return this._id;
  }
  get deck() {
    return this._deck;
  }
  get hp() {
    return this._hp;
  }
  get board() {
    return this._board;
  }

  giveDeck(deck: Deck) {
    this._deck = deck;
  }
  giveOwnBoard(board: PlayerOwnBoard) {
    if (!this._board) this._board = board;
  }

  reduceHp(quantity: number) {
    this._hp -= quantity;
    return this._hp;
  }
  increaseHp(quantity: number) {
    this._hp += quantity;
    return this._hp;
  }

  updateHp(update: number) {
    this._hp += update;
    return this._hp;
  }
}
