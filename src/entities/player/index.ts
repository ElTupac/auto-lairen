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

  updateHp(update: number) {
    this.hp += update;
    return this.hp;
  }
}
