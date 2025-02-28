import { Player } from "../entities/player";
import { prompt } from "../prompt";

export type TargetPlayerProperty = (
  playerToPrompt
) => Promise<"player_1" | "player_2">;

export const TargetPlayer: () => PropertyDecorator =
  () => (target, propertyKey) => {
    target[propertyKey] = async (playerToPrompt: Player) =>
      (
        await prompt(playerToPrompt, [
          { value: "player_1", label: "Jugador 1" },
          { value: "player_2", label: "Jugador 2" },
        ])
      ).value;
  };
