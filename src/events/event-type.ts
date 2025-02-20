import { UUID } from "crypto";
import { KingdomCard } from "../entities/deck/kingdom/cards";
import { Treasure } from "../entities/extensions/treasure";
import { GeneralPermanent } from "../entities/board/permanents";

export type EventMutationType = {
  state: "replaced" | "interrumped" | "countered";
};

export type EventType<T> = {
  id?: UUID;
  origin_type: "effect" | "order" | "permanent" | "interaction";
  origin_order: KingdomCard | Treasure | null;
  origin_permanent: GeneralPermanent | null;
  data: T;
};

export type EventDefinition<T> = (
  event: EventType<T>
) => void | EventMutationType;
