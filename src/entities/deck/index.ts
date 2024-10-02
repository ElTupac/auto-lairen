import { UUID } from "crypto";
import { Kingdom } from "./kingdom";
import { Vault } from "./vault";

export class Deck {
  player_id: UUID;
  private _kingdom: Kingdom;
  private _vault: Vault;

  constructor(deck: { player_id: UUID; kingdom: Kingdom; vault: Vault }) {
    this.player_id = deck.player_id;
    this._kingdom = deck.kingdom;
    this._vault = deck.vault;
  }

  get kingdom() {
    return this._kingdom;
  }

  get vault() {
    return this._vault;
  }
}
