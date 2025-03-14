import { Deck } from "./entities/deck";
import { Kingdom } from "./entities/deck/kingdom";
import { Vault } from "./entities/deck/vault";
import { Match } from "./entities/match";
import { Player } from "./entities/player";
import { DrawInitialHand } from "./commands/draw-initial-hand";
import readline from "node:readline";
import { PromptAdapter } from "./prompt";
import { createDeckCards, createVaultCards } from "../testing-utils";
import { MatchStart } from "./commands/match/match-start";
import { Option } from "./prompt/prompt-type";

const _ = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prompt_system: PromptAdapter = (
  options,
  abortController,
  defaultResponse,
  multipleChoice
) => {
  const questionParts = [];
  if (defaultResponse) questionParts.push(`0 - ${defaultResponse.label}\n`);
  for (let i = 1; i <= options.length; i++) {
    questionParts.push(`${i} - ${options[i - 1].label}\n`);
  }

  return new Promise<{ label: string; value: string }[]>((resolve) => {
    _.question(
      questionParts.join(""),
      { signal: abortController.signal },
      (answer) => {
        const answers = answer.split(",").map((option) => option.trim());
        if (multipleChoice) {
          let selectedOptions: Option[] = [];
          for (let i = 0; i < answers.length; i++) {
            if (+answers[i] === 0) {
              selectedOptions = [defaultResponse];
              break;
            } else {
              const option = options[+answers[i] - 1];
              selectedOptions.push(option);
            }
          }
          return resolve(selectedOptions);
        } else {
          if (+answers[0] === 0) return resolve([defaultResponse]);
          return resolve([options[+answers[0] - 1]]);
        }
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

const match = new Match({
  player_1,
  player_2,
});
new MatchStart(match);
