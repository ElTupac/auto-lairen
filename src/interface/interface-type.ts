import { UUID } from "crypto";
import { Communication } from "../commons/communication";

type InterfaceSocket = {
  id: UUID;
  type: "spectator" | `player-${number}`;
  socket: (communication: Communication) => void;
};

export type Connection = {
  id: UUID;
  type: "spectator" | `player-${number}`;
  onCommunication: (communication: Communication) => void;
};

export type InterfaceType = (...args: Connection[]) => {
  getConnections: () => InterfaceSocket[];
  addConnections: (...args: Connection[]) => InterfaceSocket[];
  startMatch: () => void;
};
