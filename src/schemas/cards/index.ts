import { CardMainType } from "../../types/card-main-type.type";
import { CardSubtypeType } from "../../types/card-subtype.type";

export type CardSchemaSubType =
  | []
  | [CardSubtypeType]
  | [CardSubtypeType, CardSubtypeType];

export type CardAttributes = "quick";

export type CardSchema<T> = {
  type: CardMainType;
  name: string;
  description: string;
  subtype: CardSchemaSubType;
  attributes?: CardAttributes[];
  cost: number;
  data: T;
};

export type PermanentSchema<T> = {
  type: CardMainType;
  name: string;
  description: string;
  subtype: CardSchemaSubType;
  cost: number;
  data: T;
  permanent_type: "unit" | "monument" | "weapon";
};
