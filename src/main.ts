import { randomUUID } from "crypto";
import { Deck } from "./entities/deck";
import { Kingdom } from "./entities/deck/kingdom";
import { Vault } from "./entities/deck/vault";
import { Match } from "./entities/match";
import { Player } from "./entities/player";
import { drawInitialHand } from "./actions/draw-initial-hand";
import { Card001 } from "../cards/pacto-secreto/001";
import { Card002 } from "../cards/pacto-secreto/002";

const player_1 = new Player();
const deck_p1 = new Deck({
  kingdom: new Kingdom(player_1, [
    new Card001(),
    new Card002(),
    new Card001(),
    new Card002(),
    new Card001(),
    new Card002(),
    new Card001(),
    new Card002(),
  ]),
  vault: new Vault(player_1, []),
  player_id: randomUUID(),
});
player_1.giveDeck(deck_p1);

player_1.deck.kingdom.shuffleContent();
player_1.deck.vault.shuffleContent();

const player_2 = new Player();

const deck_p2 = new Deck({
  kingdom: new Kingdom(player_2, [
    new Card001(),
    new Card002(),
    new Card001(),
    new Card002(),
    new Card001(),
    new Card002(),
    new Card001(),
    new Card002(),
  ]),
  vault: new Vault(player_2, []),
  player_id: randomUUID(),
});
player_2.giveDeck(deck_p2);

player_2.deck.kingdom.shuffleContent();
player_2.deck.vault.shuffleContent();

drawInitialHand(player_1);
drawInitialHand(player_2);

// TODO: Mulligan step

new Match({
  first_turn: "player_1",
  player_1,
  player_2,
});
