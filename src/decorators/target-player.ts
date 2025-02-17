import { prompt } from "../prompt";

export const TargetPlayer: ParameterDecorator = (
  target,
  propertyKey,
  parameterIndex
) => {
  target[propertyKey][parameterIndex] = prompt<"player_1" | "player_2">([
    "player_1",
    "player_2",
  ]);
};
