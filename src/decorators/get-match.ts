import { getCurrentMatch } from "../entities/match";

export const GetMatch: ParameterDecorator = (
  target,
  propertyKey,
  parameterIndex
) => {
  target[propertyKey][parameterIndex] = getCurrentMatch();
};
