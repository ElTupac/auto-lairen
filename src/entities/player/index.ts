import { randomUUID, UUID } from "crypto";
import { HandArea } from "./areas/hand-area";
import { Deck } from "../deck";

export class Player {
  private _id: UUID;
  private _deck: Deck;
  hp: number;
  playerHand: HandArea;

  constructor(player: { deck: Deck }) {
    this._id = randomUUID();
    this.hp = 20;
    this._deck = player.deck;
    this.playerHand = new HandArea();
  }

  get id() {
    return this._id;
  }
  get deck() {
    return this._deck;
  }

  reduceHp(quantity: number) {
    this.hp -= quantity;
  }
  addHp(quantity: number) {
    this.hp += quantity;
  }

  updateHp(update: number) {
    this.hp += update;
    return this.hp;
  }
}
