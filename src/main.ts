import { Communication } from "./commons/communication";
import { Connection, InterfaceType } from "./interface/interface-type";
import { Player } from "./match/entities/player/player";
import { Spectator } from "./match/entities/spectator/spectator";
import { Match } from "./match/match";

const _connections: Connection[] = [];

const _addConnections =
  (match: Match) =>
  (...connections: Connection[]) => {
    for (let i = 0; i < connections.length; i++) {
      const connection = connections[i];

      if (connection.type === "spectator")
        match.addSpectator(new Spectator({ connection }));
      else if (connection.type.includes("player") && !match.match_started) {
        match.addPlayer(new Player({ connection }));
      } else {
        continue;
      }

      _connections.push(connection);
    }
  };

export const main: InterfaceType = (...connections) => {
  const handleMatchCommunication = (communication: Communication) => {
    console.log("Communication going out");
    console.log({ communication });
  };

  const match = new Match(handleMatchCommunication);

  const addConnections = _addConnections(match);
  addConnections(...connections);

  return {
    addConnections: (...connections: Connection[]) => {
      addConnections(...connections);

      return _connections.map(({ id, type }) => ({
        id,
        type,
        socket: (communication) => {
          match.receiveCommunication(communication);
        },
      }));
    },
    startMatch: () => {
      console.log("want to start match");
    },
    getConnections: () =>
      _connections.map(({ id, type }) => ({
        id,
        type,
        socket: (communication) => {
          match.receiveCommunication(communication);
        },
      })),
  };
};
