import { UUID } from "crypto";

export type EventType<T> = {
  id: UUID;
  data: T;
};
