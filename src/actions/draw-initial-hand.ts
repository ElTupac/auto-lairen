import { Player } from "../entities/player";

const CARDS_TO_DRAW = 7;

export const drawInitialHand = (player: Player) => {
  for (let i = CARDS_TO_DRAW; i > 0; i--) {
    player.playerHand.addCards(player.deck.kingdom.drawCard());
  }
};
