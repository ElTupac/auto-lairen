import { Deck } from "./entities/deck";
import { Kingdom } from "./entities/deck/kingdom";
import { Vault } from "./entities/deck/vault";
import { Match } from "./entities/match";
import { Player } from "./entities/player";
import { DrawInitialHand } from "./commands/draw-initial-hand";
import readline from "node:readline";
import { PromptAdapter } from "./prompt";
import { createDeckCards, createVaultCards } from "../testing-utils";

const _ = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prompt_system: PromptAdapter = (options, abortController) => {
  const questionParts = [];
  for (let i = 0; i < options.length; i++) {
    questionParts.push(`${i} - ${options[i].label}\n`);
  }

  return new Promise<{ label: string; value: string }>((resolve) => {
    _.question(
      questionParts.join(""),
      { signal: abortController.signal },
      (answer) => {
        const selectedOption = options[+answer] || { label: "", value: "" };
        return resolve(selectedOption);
      }
    );
  });
};

const player_1 = new Player({
  prompt_system,
});
const deck_p1 = new Deck({
  kingdom: new Kingdom(player_1, createDeckCards()),
  vault: new Vault(player_1, createVaultCards()),
  player_id: player_1.id,
});
player_1.giveDeck(deck_p1);

player_1.deck.kingdom.shuffleContent();
player_1.deck.vault.shuffleContent();

const player_2 = new Player({
  prompt_system,
});

const deck_p2 = new Deck({
  kingdom: new Kingdom(player_2, createDeckCards()),
  vault: new Vault(player_2, createVaultCards()),
  player_id: player_2.id,
});
player_2.giveDeck(deck_p2);

player_2.deck.kingdom.shuffleContent();
player_2.deck.vault.shuffleContent();

new DrawInitialHand(player_1);
new DrawInitialHand(player_2);

// TODO: Mulligan step

new Match({
  first_turn: "player_1",
  player_1,
  player_2,
});
