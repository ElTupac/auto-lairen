import { CardSchema } from ".";
import { ActionCardAttributeType } from "../../types/action-card-attribute.type";

export type ActionCardSchema = CardSchema<{
  attributes: ActionCardAttributeType[];
}>;
