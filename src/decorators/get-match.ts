import { getCurrentMatch } from "../entities/match";

export const GetMatch: PropertyDecorator = (target, propertyKey) => {
  target[propertyKey] = getCurrentMatch();
};
