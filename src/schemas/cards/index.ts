import { Stackable } from "../../entities/extensions/stackable";
import { Match } from "../../entities/match";
import { CardMainType } from "../../types/card-main-type.type";
import { CardSubtypeType } from "../../types/card-subtype.type";

type CardSchemaSubType =
  | []
  | [CardSubtypeType]
  | [CardSubtypeType, CardSubtypeType];

export type CardSchema<T> = {
  type: CardMainType;
  name: string;
  description: string;
  subtype: CardSchemaSubType;
  cost: number;
  // TODO: define additional_cost flow
  additional_cost: unknown | null;
  data: T;

  on_play: (match: Match) => Promise<Stackable>;
};
