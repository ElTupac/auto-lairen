import { Connection, InterfaceType } from "./interface/interface-type";
import { Match } from "./match/match";

const _connections: Connection[] = [];

export const main: InterfaceType = (...connections) => {
  for (let i = 0; i < connections.length; i++) {
    if (!_connections.some(({ id }) => id === connections[i].id))
      _connections.push(connections[i]);
  }

  const match: Match = new Match((event) => {
    for (let i = 0; i < _connections.length; i++) {
      console.log("Output event");
      console.log(event);

      _connections[i].onAction(event);
    }
  });

  return {
    connections: _connections.map(({ id }) => ({
      id,
      socket: match.emitEvent,
    })),
    addConnections: (...connections) => {
      for (let i = 0; i < connections.length; i++) {
        if (!_connections.some(({ id }) => id === connections[i].id))
          _connections.push(connections[i]);
      }

      return _connections.map(({ id }) => ({ id, socket: match.emitEvent }));
    },
  };
};
