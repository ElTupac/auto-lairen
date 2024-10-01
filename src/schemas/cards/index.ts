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
  data: T;
};
