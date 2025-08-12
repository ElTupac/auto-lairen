import { UUID } from "crypto";
import { Event } from "../commons/event";

type ActionHook = (action: Event) => void;

type InterfaceSocket = {
  id: UUID;
  socket: ActionHook;
};

export type Connection = {
  id: UUID;
  onAction: ActionHook;
};

export type InterfaceType = (...args: Connection[]) => {
  connections: InterfaceSocket[];
  addConnections: (...args: Connection[]) => InterfaceSocket[];
  startMatch: () => void;
};
