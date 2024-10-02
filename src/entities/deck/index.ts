import { UUID } from "crypto";
import { Kingdom } from "./kingdom";
import { Vault } from "./vault";

export class Deck {
  player_id: UUID;
  kingdom: Kingdom;
  vault: Vault;

  constructor(deck: { player_id: UUID; kingdom: Kingdom; vault: Vault }) {
    this.player_id = deck.player_id;
    this.kingdom = deck.kingdom;
    this.vault = deck.vault;
  }
}
