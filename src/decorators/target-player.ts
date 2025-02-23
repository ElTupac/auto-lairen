import { prompt } from "../prompt";

export const TargetPlayer: PropertyDecorator = (target, propertyKey) => {
  target[propertyKey] = () =>
    prompt([
      { value: "player_1", label: "Jugador 1" },
      { value: "player_2", label: "Jugador 2" },
    ]);
};
