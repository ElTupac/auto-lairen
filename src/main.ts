import { randomUUID } from "crypto";
import { Deck } from "./entities/deck";
import { Kingdom } from "./entities/deck/kingdom";
import { Vault } from "./entities/deck/vault";
import { Match } from "./entities/match";
import { Player } from "./entities/player";

const player_1 = new Player({
  deck: new Deck({
    kingdom: new Kingdom([]),
    vault: new Vault([]),
    player_id: randomUUID(),
  }),
});

const player_2 = new Player({
  deck: new Deck({
    kingdom: new Kingdom([]),
    vault: new Vault([]),
    player_id: randomUUID(),
  }),
});

new Match({
  first_turn: "player_1",
  player_1,
  player_2,
});
