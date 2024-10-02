import { randomUUID, UUID } from "crypto";
import { HandArea } from "./areas/hand-area";

export class Player {
  private _id: UUID;
  hp: number;
  playerHand: HandArea;

  constructor() {
    this._id = randomUUID();
    this.hp = 20;
    this.playerHand = new HandArea();
  }

  get id() {
    return this._id;
  }

  updateHp(update: number) {
    this.hp += update;
    return this.hp;
  }
}
