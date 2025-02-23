import { prompt } from "../prompt";

export const TargetPlayer: ParameterDecorator = (
  target,
  propertyKey,
  parameterIndex
) => {
  target[propertyKey][parameterIndex] = () =>
    prompt([
      { value: "player_1", label: "Jugador 1" },
      { value: "player_2", label: "Jugador 2" },
    ]);
};
