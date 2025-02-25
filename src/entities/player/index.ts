import { randomUUID, UUID } from "crypto";
import { HandArea } from "./areas/hand-area";
import { Deck } from "../deck";
import { PlayerOwnBoard } from "../board";
import { PromptAdapter } from "../../prompt";

export class Player {
  private _id: UUID;
  private _deck: Deck;
  private _board: PlayerOwnBoard;
  private _hp: number;

  private _prompt_system: PromptAdapter;

  playerHand: HandArea;

  constructor(player: {
    deck?: Deck;
    initialHp?: number;
    prompt_system: PromptAdapter;
  }) {
    this._id = randomUUID();
    this._prompt_system = player.prompt_system;
    this._hp = player?.initialHp || 20;
    this._deck = player?.deck;
    this.playerHand = new HandArea(this);
  }

  get prompt_system() {
    return this._prompt_system;
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
